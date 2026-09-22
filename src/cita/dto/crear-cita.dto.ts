import { IsISO8601, IsMongoId, IsNumber, IsPositive } from 'class-validator';

export class CrearCitaDto {
  @IsMongoId() patientId!: string;
  @IsMongoId() doctorId!: string;
  @IsISO8601() startAt!: string;
  @IsNumber() @IsPositive() amount!: number;
}
