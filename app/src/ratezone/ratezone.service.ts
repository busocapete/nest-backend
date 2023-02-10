import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatezoneDto } from './dto/create-ratezone.dto';
import { RateZoneEntity } from './entities/rateZone.entity';

@Injectable()
export class RatezoneService {
  constructor(
    @InjectRepository(RateZoneEntity)
    private readonly ratezones: Repository<RateZoneEntity>,
  ) {}

  async getAll(): Promise<RateZoneEntity[]> {
    return this.ratezones.find();
  }

  async create(createRatezoneDto: CreateRatezoneDto): Promise<RateZoneEntity> {
    return this.ratezones.save({ ...createRatezoneDto });
  }
}
