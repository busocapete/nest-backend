import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { TariffEntity } from './entities/tariff.entity';

@Injectable()
export class TariffService {
  constructor(
    @InjectRepository(TariffEntity)
    private readonly tariffs: Repository<TariffEntity>,
  ) {}
  create(createTariffDto: CreateTariffDto) {
    return 'This action adds a new tariff';
  }

  findAll() {
    return this.tariffs.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tariff`;
  }

  update(id: number, updateTariffDto: UpdateTariffDto) {
    return `This action updates a #${id} tariff`;
  }

  remove(id: number) {
    return `This action removes a #${id} tariff`;
  }
}
