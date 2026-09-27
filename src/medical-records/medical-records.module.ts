import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from '../appointments/schemas/appointment.schema.js';
import { MedicalRecord, MedicalRecordSchema } from './schemas/medical-record.schema.js';
import { MedicalRecordsController } from './medical-records.controller.js';
import { MedicalRecordsService } from './medical-records.service.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: MedicalRecord.name, schema: MedicalRecordSchema }, { name: Appointment.name, schema: AppointmentSchema }])],
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService],
})
export class MedicalRecordsModule {}
 