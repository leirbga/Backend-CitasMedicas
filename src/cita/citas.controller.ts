import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CrearCitaDto } from './dto/crear-cita.dto.js';
import { CitasService } from './citas.service.js';

@Controller('citas')
export class CitasController {
  constructor(private readonly service: CitasService) {}
  @Post() create(@Body() dto: CrearCitaDto) { return this.service.create(dto); }
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findById(id); }
}
