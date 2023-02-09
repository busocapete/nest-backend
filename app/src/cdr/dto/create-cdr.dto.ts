import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCdrDto {
  @IsNotEmpty()
  @IsNumber()
  simId: number;

  @IsNotEmpty()
  @IsNumber()
  ratezoneId: number;

  @IsNotEmpty()
  @IsNumber()
  volume: number;
}
