import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema({ timestamps: true })
export class Doctor {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, trim: true })
  specialty!: string;

  @Prop({ required: true, min: 1 })
  consultationDurationMinutes!: number;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
 