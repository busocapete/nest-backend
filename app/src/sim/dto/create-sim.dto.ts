import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSimDto {
  @IsNumber()
  @IsNotEmpty()
  organisationId: number;
}
