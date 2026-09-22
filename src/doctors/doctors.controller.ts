import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto.js';
import { DoctorsService } from './doctors.service.js';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly service: DoctorsService) {}

  @Post()
  create(@Body() dto: CreateDoctorDto) { return this.service.create(dto); }

  @Get()
  findAll() { return this.service.findAll(); }
}
