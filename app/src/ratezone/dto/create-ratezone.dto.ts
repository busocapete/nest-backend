import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRatezoneDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
