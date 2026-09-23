import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import type { Model } from 'mongoose';
import { Appointment, AppointmentDocument, AppointmentStatus } from '../appointments/schemas/appointment.schema.js';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto.js';
import { MedicalRecord, MedicalRecordDocument } from './schemas/medical-record.schema.js';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectModel(MedicalRecord.name) private readonly records: Model<MedicalRecordDocument>,
    @InjectModel(Appointment.name) private readonly appointments: Model<AppointmentDocument>,
  ) {}

  async create(dto: CreateMedicalRecordDto) {
    if (!Types.ObjectId.isValid(dto.appointmentId)) throw new NotFoundException('Cita no encontrada');
    const appointment = await this.appointments.findById(dto.appointmentId);
    if (!appointment) throw new NotFoundException('Cita no encontrada');
    if (appointment.status !== AppointmentStatus.PAID) throw new BadRequestException('La cita debe estar PAGADA para registrar atención médica');
    try {
      const record = await this.records.create({ ...dto, appointmentId: new Types.ObjectId(dto.appointmentId), attendedAt: new Date(dto.attendedAt) });
      appointment.status = AppointmentStatus.COMPLETED;
      await appointment.save();
      return record;
    } catch (error: unknown) {
      if ((error as { code?: number }).code === 11000) throw new ConflictException('La cita ya tiene una ficha médica');
      throw error;
    }
  }
  findAll() { return this.records.find().sort({ attendedAt: -1 }).lean(); }
}
