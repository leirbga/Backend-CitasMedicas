import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto.js';
import { RegistrosMedicosService } from './medical-records.service.js';

@Controller('registros-medicos')
export class RegistrosMedicosController {
  constructor(private readonly service: RegistrosMedicosService) {}
  @Post() create(@Body() dto: CreateMedicalRecordDto) { return this.service.create(dto); }
  @Get() findAll() { return this.service.findAll(); }
}
