import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import seedData from '../../seed/seed-data.json' with { type: 'json' };
import { Doctor, DoctorDocument } from '../doctores/schemas/doctor.schema.js';
import { Patient, PatientDocument } from '../pacientes/schemas/patient.schema.js';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel(Doctor.name) private readonly doctors: Model<DoctorDocument>,
    @InjectModel(Patient.name) private readonly patients: Model<PatientDocument>,
  ) {}

  async onModuleInit() {
    if ((await this.doctors.countDocuments()) === 0) await this.doctors.insertMany(seedData.doctores);
    if ((await this.patients.countDocuments()) === 0) await this.patients.insertMany(seedData.pacientes);
  }
}
