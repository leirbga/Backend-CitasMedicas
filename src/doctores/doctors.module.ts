import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from './schemas/doctor.schema.js';
import { DoctoresController } from './doctors.controller.js';
import { DoctoresService } from './doctors.service.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }])],
  controllers: [DoctoresController],
  providers: [DoctoresService],
  exports: [DoctoresService, MongooseModule],
})
export class DoctoresModule {}
