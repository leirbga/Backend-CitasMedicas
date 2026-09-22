import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDoctorDto } from './dto/create-doctor.dto.js';
import { Doctor, DoctorDocument } from './schemas/doctor.schema.js';

@Injectable()
export class DoctorsService {
  constructor(@InjectModel(Doctor.name) private readonly model: Model<DoctorDocument>) {}

  create(dto: CreateDoctorDto) {
    return this.model.create(dto);
  }

  findAll() {
    return this.model.find().sort({ name: 1 }).lean();
  }

  async findById(id: string) {
    return this.model.findById(id).lean();
  }
}
