import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString() @IsNotEmpty() name!: string;
  @IsString() @IsNotEmpty() dni!: string;
  @IsString() @IsNotEmpty() phone!: string;
}
 