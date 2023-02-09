import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRateDto {
  @IsNumber()
  @IsNotEmpty()
  ratezoneId: number;

  @IsNumber()
  @IsNotEmpty()
  amountPerVolume: number;
}
