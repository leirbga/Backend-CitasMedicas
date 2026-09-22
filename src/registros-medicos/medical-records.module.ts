import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from '../cita/schemas/cita.schema.js';
import { MedicalRecord, MedicalRecordSchema } from './schemas/medical-record.schema.js';
import { RegistrosMedicosController } from './medical-records.controller.js';
import { RegistrosMedicosService } from './medical-records.service.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: MedicalRecord.name, schema: MedicalRecordSchema }, { name: Appointment.name, schema: AppointmentSchema }])],
  controllers: [RegistrosMedicosController],
  providers: [RegistrosMedicosService],
})
export class RegistrosMedicosModule {}
