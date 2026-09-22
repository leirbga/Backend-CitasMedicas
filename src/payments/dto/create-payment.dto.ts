import { ArrayMinSize, IsArray, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { PaymentMethod } from '../schemas/payment.schema.js';

export class CreatePaymentDto {
  @IsArray() @ArrayMinSize(1) @IsMongoId({ each: true }) appointmentIds!: string[];
  @IsEnum(PaymentMethod) paymentMethod!: PaymentMethod;
  @IsString() @IsNotEmpty() bankReference!: string;
  @IsNumber() @IsPositive() amount!: number;
}
