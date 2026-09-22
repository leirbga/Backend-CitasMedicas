import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto.js';
import { PatientsService } from './patients.service.js';

@Controller('patients')
export class PatientsController {
  constructor(private readonly service: PatientsService) {}
  @Post() create(@Body() dto: CreatePatientDto) { return this.service.create(dto); }
  @Get() findAll() { return this.service.findAll(); }
}
