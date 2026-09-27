import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import type { HydratedDocument } from 'mongoose';

export enum PaymentMethod { MOBILE_PAYMENT = 'PAGO_MOVIL', TRANSFER = 'TRANSFERENCIA' }
export enum PaymentStatus { PENDING = 'PENDIENTE', APPROVED = 'APROBADO', REJECTED = 'RECHAZADO' }
export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: [Types.ObjectId], ref: 'Appointment', required: true }) appointmentIds!: Types.ObjectId[];
  @Prop({ required: true, enum: Object.values(PaymentMethod) }) paymentMethod!: PaymentMethod;
  @Prop({ required: true, trim: true }) bankReference!: string;
  @Prop({ required: true, min: 0 }) amount!: number;
  @Prop({ required: true, enum: Object.values(PaymentStatus), default: PaymentStatus.PENDING }) status!: PaymentStatus;
  @Prop() rejectionReason?: string;
}
export const PaymentSchema = SchemaFactory.createForClass(Payment);
PaymentSchema.index({ bankReference: 1, status: 1 });
 