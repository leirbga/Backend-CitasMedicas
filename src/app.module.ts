import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DoctoresModule } from './doctores/doctors.module.js';
import { PacientesModule } from './pacientes/patients.module.js';
import { AppointmentsModule } from './appointments/appointments.module.js';
import { PagosModule } from './pagos/payments.module.js';
import { RegistrosMedicosModule } from './registros-medicos/medical-records.module.js';
import { SeedService } from './seed/seed.service.js';
import { Doctor, DoctorSchema } from './doctores/schemas/doctor.schema.js';
import { Patient, PatientSchema } from './pacientes/schemas/patient.schema.js';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/citas-medicas'),
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }, { name: Patient.name, schema: PatientSchema }]),
    DoctoresModule,
    PacientesModule,
    AppointmentsModule,
    PagosModule,
    RegistrosMedicosModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
