import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import type { ClientSession, Connection, Model } from 'mongoose';
import { Appointment, AppointmentDocument, AppointmentStatus } from '../appointments/schemas/appointment.schema.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { RejectPaymentDto } from './dto/reject-payment.dto.js';
import { Payment, PaymentDocument, PaymentStatus } from './schemas/payment.schema.js';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private readonly payments: Model<PaymentDocument>,
    @InjectModel(Appointment.name) private readonly appointments: Model<AppointmentDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(dto: CreatePaymentDto) {
    const appointments = await this.appointments.find({ _id: { $in: dto.appointmentIds } }).lean();
    if (appointments.length !== dto.appointmentIds.length) throw new NotFoundException('Una o más citas no existen');
    if (appointments.some((item) => item.status !== AppointmentStatus.RESERVED)) throw new BadRequestException('Todas las citas deben estar RESERVADAS');
    if (appointments.reduce((sum, item) => sum + item.amount, 0) !== dto.amount) throw new BadRequestException('El monto no coincide con las citas');
    const active = await this.payments.exists({ bankReference: dto.bankReference, status: { $in: [PaymentStatus.PENDING, PaymentStatus.APPROVED] } });
    if (active) throw new ConflictException('La referencia bancaria ya está en uso');
    const session = await this.connection.startSession();
    try {
      let result: PaymentDocument[];
      await session.withTransaction(async () => {
        result = await this.payments.create([{ ...dto, appointmentIds: dto.appointmentIds.map((id) => new Types.ObjectId(id)) }], { session });
        await this.appointments.updateMany({ _id: { $in: dto.appointmentIds } }, { $set: { status: AppointmentStatus.PENDING_PAYMENT } }, { session });
      });
      return result![0];
    } finally { await session.endSession(); }
  }

  findAll() { return this.payments.find().sort({ createdAt: -1 }).lean(); }
  private async changeStatus(id: string, status: PaymentStatus, reason?: string) {
    const session: ClientSession = await this.connection.startSession();
    try {
      let payment: PaymentDocument | null = null;
      await session.withTransaction(async () => {
        payment = await this.payments.findById(id).session(session);
        if (!payment) throw new NotFoundException('Pago no encontrado');
        if (payment.status !== PaymentStatus.PENDING) throw new BadRequestException('El pago ya fue procesado');
        payment.status = status; payment.rejectionReason = reason; await payment.save({ session });
        await this.appointments.updateMany({ _id: { $in: payment.appointmentIds } }, { $set: { status: status === PaymentStatus.APPROVED ? AppointmentStatus.PAID : AppointmentStatus.RESERVED } }, { session });
      });
      return payment;
    } finally { await session.endSession(); }
  }
  approve(id: string) { return this.changeStatus(id, PaymentStatus.APPROVED); }
  reject(id: string, dto: RejectPaymentDto) { return this.changeStatus(id, PaymentStatus.REJECTED, dto.reason); }
}
