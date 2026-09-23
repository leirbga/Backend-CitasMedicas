import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import type { HydratedDocument } from 'mongoose';

export type MedicalRecordDocument = HydratedDocument<MedicalRecord>;

@Schema({ timestamps: true })
export class MedicalRecord {
  @Prop({ type: Types.ObjectId, ref: 'Appointment', required: true, unique: true }) appointmentId!: Types.ObjectId;
  @Prop({ required: true, trim: true }) reason!: string;
  @Prop({ required: true, trim: true }) diagnosis!: string;
  @Prop({ required: true, trim: true }) treatment!: string;
  @Prop({ required: true, type: Date }) attendedAt!: Date;
}
export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);
