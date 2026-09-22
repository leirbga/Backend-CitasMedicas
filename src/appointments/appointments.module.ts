import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctoresModule } from '../doctores/doctors.module.js';
import { PacientesModule } from '../pacientes/patients.module.js';
import { Appointment, AppointmentSchema } from './schemas/appointment.schema.js';
import { AppointmentsController } from './appointments.controller.js';
import { AppointmentsService } from './appointments.service.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }]), DoctoresModule, PacientesModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService, MongooseModule],
})
export class AppointmentsModule {}
