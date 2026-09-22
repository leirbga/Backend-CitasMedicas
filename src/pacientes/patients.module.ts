import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './schemas/patient.schema.js';
import { PacientesController } from './patients.controller.js';
import { PacientesService } from './patients.service.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }])],
  controllers: [PacientesController],
  providers: [PacientesService],
  exports: [PacientesService, MongooseModule],
})
export class PacientesModule {}
