import { IsISO8601, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsMongoId() appointmentId!: string;
  @IsString() @IsNotEmpty() reason!: string;
  @IsString() @IsNotEmpty() diagnosis!: string;
  @IsString() @IsNotEmpty() treatment!: string;
  @IsISO8601() attendedAt!: string;
}
 