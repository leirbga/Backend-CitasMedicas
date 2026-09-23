import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { CreatePatientDto } from './dto/create-patient.dto.js';
import { Patient, PatientDocument } from './schemas/patient.schema.js';

@Injectable()
export class PatientsService {
  constructor(@InjectModel(Patient.name) private readonly model: Model<PatientDocument>) {}
  async create(dto: CreatePatientDto) {
    try { return await this.model.create(dto); }
    catch (error: unknown) {
      if ((error as { code?: number }).code === 11000) throw new ConflictException('El DNI ya está registrado');
      throw error;
    }
  }
  findAll() { return this.model.find().sort({ name: 1 }).lean(); }
  findById(id: string) { return this.model.findById(id).lean(); }
}
