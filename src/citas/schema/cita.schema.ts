import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CitasDocument = Citas & Document;

@Schema({ timestamps: true })
export class Citas {
  @Prop({ type: Types.ObjectId, ref: 'Paciente', required: true })
  patientId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Medico', required: true })
  doctorId: Types.ObjectId;

  @Prop({ required: true })
  fechaInicio: Date; // ISO 8601

  @Prop({
    required: true,
    enum: ['RESERVADA', 'PENDIENTE_PAGO', 'PAGADA', 'COMPLETADA', 'CANCELADA'],
    default: 'RESERVADA',
  })
  estado: string;

  @Prop({ required: true })
  monto: number;
}

export const CitasSchema = SchemaFactory.createForClass(Citas);