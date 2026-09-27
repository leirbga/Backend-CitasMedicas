import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto.js';
import { MedicalRecordsService } from './medical-records.service.js';

@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly service: MedicalRecordsService) {}
  @Post() create(@Body() dto: CreateMedicalRecordDto) { return this.service.create(dto); }
  @Get() findAll() { return this.service.findAll(); }
}
 