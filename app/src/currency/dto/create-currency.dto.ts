import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsString()
  symbol: string;
}
