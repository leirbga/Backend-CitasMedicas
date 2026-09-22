import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum AppointmentStatus { RESERVED = 'RESERVADA', PENDING_PAYMENT = 'PENDIENTE_PAGO', PAID = 'PAGADA', COMPLETED = 'COMPLETADA', CANCELLED = 'CANCELADA' }
export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true }) patientId!: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Doctor', required: true }) doctorId!: Types.ObjectId;
  @Prop({ required: true, type: Date }) startAt!: Date;
  @Prop({ required: true, enum: Object.values(AppointmentStatus), default: AppointmentStatus.RESERVED }) status!: AppointmentStatus;
  @Prop({ required: true, min: 0 }) amount!: number;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
AppointmentSchema.index({ doctorId: 1, startAt: 1, status: 1 });
