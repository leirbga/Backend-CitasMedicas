import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DoctoresService } from '../doctores/doctors.service.js';
import { PacientesService } from '../pacientes/patients.service.js';
import { CrearCitaDto } from './dto/crear-cita.dto.js';
import { Appointment, AppointmentDocument, AppointmentStatus } from './schemas/cita.schema.js';

@Injectable()
export class CitasService {
  constructor(
    @InjectModel(Appointment.name) private readonly model: Model<AppointmentDocument>,
    private readonly doctors: DoctoresService,
    private readonly patients: PacientesService,
  ) {}

  async create(dto: CrearCitaDto) {
    const [doctor, patient] = await Promise.all([this.doctors.findById(dto.doctorId), this.patients.findById(dto.patientId)]);
    if (!doctor) throw new NotFoundException('Médico no encontrado');
    if (!patient) throw new NotFoundException('Paciente no encontrado');
    const startAt = new Date(dto.startAt);
    const endAt = new Date(startAt.getTime() + doctor.consultationDurationMinutes * 60_000);
    const occupied = await this.model.findOne({
      doctorId: dto.doctorId,
      status: { $in: [AppointmentStatus.RESERVED, AppointmentStatus.PENDING_PAYMENT, AppointmentStatus.PAID] },
      $expr: {
        $and: [
          { $lt: ['$startAt', endAt] },
          { $gt: [{ $add: ['$startAt', doctor.consultationDurationMinutes * 60_000] }, startAt] },
        ],
      },
    }).lean();
    if (occupied) throw new ConflictException('El médico no está disponible en ese horario');
    return this.model.create({ ...dto, startAt });
  }

  findAll() { return this.model.find().sort({ startAt: 1 }).lean(); }
  async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Cita no encontrada');
    const appointment = await this.model.findById(id).lean();
    if (!appointment) throw new NotFoundException('Cita no encontrada');
    return appointment;
  }
}
