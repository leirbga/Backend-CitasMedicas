import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctoresModule } from '../doctores/doctors.module.js';
import { PacientesModule } from '../pacientes/patients.module.js';
import { Appointment, AppointmentSchema } from './schemas/cita.schema.js';
import { CitasController } from './citas.controller.js';
import { CitasService } from './citas.service.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }]), DoctoresModule, PacientesModule],
  controllers: [CitasController],
  providers: [CitasService],
  exports: [CitasService, MongooseModule],
})
export class CitasModule {}
