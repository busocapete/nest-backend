import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRatezoneDto } from './dto/create-ratezone.dto';
import { RateZoneEntity } from './entities/rateZone.entity';
import { RatezoneService } from './ratezone.service';

@Controller('ratezones')
export class RatezoneController {
  constructor(private readonly ratezoneService: RatezoneService) {}

  @Get()
  getAll(): Promise<RateZoneEntity[]> {
    return this.ratezoneService.getAll();
  }

  @Post()
  create(
    @Body() createRatezoneDto: CreateRatezoneDto,
  ): Promise<RateZoneEntity> {
    return this.ratezoneService.create(createRatezoneDto);
  }
}
