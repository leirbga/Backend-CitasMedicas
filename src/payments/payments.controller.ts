import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { RejectPaymentDto } from './dto/reject-payment.dto.js';
import { PaymentsService } from './payments.service.js';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}
  @Post() create(@Body() dto: CreatePaymentDto) { return this.service.create(dto); }
  @Get() findAll() { return this.service.findAll(); }
  @Patch(':id/approve') approve(@Param('id') id: string) { return this.service.approve(id); }
  @Patch(':id/reject') reject(@Param('id') id: string, @Body() dto: RejectPaymentDto) { return this.service.reject(id, dto); }
}
 