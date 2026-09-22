import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DoctorsModule } from './doctors/doctors.module.js';
import { PatientsModule } from './patients/patients.module.js';
import { AppointmentsModule } from './appointments/appointments.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { MedicalRecordsModule } from './medical-records/medical-records.module.js';
import { SeedService } from './seed/seed.service.js';
import { Doctor, DoctorSchema } from './doctors/schemas/doctor.schema.js';
import { Patient, PatientSchema } from './patients/schemas/patient.schema.js';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/citas-medicas'),
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }, { name: Patient.name, schema: PatientSchema }]),
    DoctorsModule,
    PatientsModule,
    AppointmentsModule,
    PaymentsModule,
    MedicalRecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
