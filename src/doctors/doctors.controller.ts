import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto.js';
import { DoctorsService } from './doctors.service.js';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly service: DoctorsService) {}

  @Post()
  create(@Body() dto: CreateDoctorDto) { return this.service.create(dto); }

  @Get()
  findAll() { return this.service.findAll(); }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const doctor = await this.service.findById(id);
    if (!doctor) throw new NotFoundException('Médico no encontrado');
    return doctor;
  }
}
 