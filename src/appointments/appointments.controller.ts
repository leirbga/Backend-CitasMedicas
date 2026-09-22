import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto.js';
import { CitasService } from './appointments.service.js';

@Controller('citas')
export class CitasController {
  constructor(private readonly service: CitasService) {}
  @Post() create(@Body() dto: CreateAppointmentDto) { return this.service.create(dto); }
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findById(id); }
}
