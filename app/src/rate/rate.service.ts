import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRateDto } from './dto/create-rate.dto';
import { RateEntity } from './entities/rate.entity';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(RateEntity)
    private readonly rates: Repository<RateEntity>,
  ) {}

  async create(createRateDto: CreateRateDto): Promise<RateEntity> {
    return this.rates.save({ ...createRateDto });
  }

  findAll(): Promise<RateEntity[]> {
    return this.rates.find();
  }

  findById(id: number): Promise<RateEntity> {
    return this.rates.findOne({
      where: {
        rateId: id,
      },
    });
  }

  async delete(rateId: number): Promise<RateEntity> {
    const rateToRemove = await this.rates.findOne({
      where: { rateId },
    });

    return await this.rates.remove(rateToRemove);
  }
}
