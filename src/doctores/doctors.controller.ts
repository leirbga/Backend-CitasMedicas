import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto.js';
import { DoctoresService } from './doctors.service.js';

@Controller('doctores')
export class DoctoresController {
  constructor(private readonly service: DoctoresService) {}

  @Post()
  create(@Body() dto: CreateDoctorDto) { return this.service.create(dto); }

  @Get()
  findAll() { return this.service.findAll(); }
}
