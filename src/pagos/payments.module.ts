import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from '../appointments/schemas/appointment.schema.js';
import { Payment, PaymentSchema } from './schemas/payment.schema.js';
import { PagosController } from './payments.controller.js';
import { PagosService } from './payments.service.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }, { name: Appointment.name, schema: AppointmentSchema }])],
  controllers: [PagosController],
  providers: [PagosService],
})
export class PagosModule {}
