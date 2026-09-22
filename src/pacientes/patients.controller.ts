import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto.js';
import { PacientesService } from './patients.service.js';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly service: PacientesService) {}
  @Post() create(@Body() dto: CreatePatientDto) { return this.service.create(dto); }
  @Get() findAll() { return this.service.findAll(); }
}
