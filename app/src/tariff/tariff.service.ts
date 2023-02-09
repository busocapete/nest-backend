import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { TariffEntity } from './entities/tariff.entity';

@Injectable()
export class TariffService {
  constructor(
    @InjectRepository(TariffEntity)
    private readonly tariffs: Repository<TariffEntity>,
  ) {}
  create(createTariffDto: CreateTariffDto) {
    return this.tariffs.save({
      ...createTariffDto,
    });
  }

  findAll() {
    return this.tariffs.find();
  }

  findById(id: number): Promise<TariffEntity> {
    return this.tariffs.findOne({
      where: {
        tariffId: id,
      },
    });
  }

  async remove(tariffId: number) {
    const tariffToRemove = await this.tariffs.findOne({
      where: { tariffId },
    });
    return this.tariffs.remove(tariffToRemove);
  }
}
