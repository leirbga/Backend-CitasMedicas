import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  specialty!: string;

  @IsInt()
  @IsPositive()
  consultationDurationMinutes!: number;
}
