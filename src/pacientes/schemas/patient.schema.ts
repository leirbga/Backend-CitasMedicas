import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PatientDocument = HydratedDocument<Patient>;

@Schema({ timestamps: true })
export class Patient {
  @Prop({ required: true, trim: true }) name!: string;
  @Prop({ required: true, unique: true, trim: true }) dni!: string;
  @Prop({ required: true, trim: true }) phone!: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
