import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrgansiationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  defaultCurrencyId: number;
  tariffId: number;
}
