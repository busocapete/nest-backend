import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class CreateTariffDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  subscriptionCostPerSim: number;

  @IsNumber()
  @IsNotEmpty()
  inclusiveVolume: number;

  @IsBoolean()
  isPayg: boolean;

  @IsDate()
  activeFrom: Date;
}
