import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { CurrencyEntity } from './entities/currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrencyEntity)
    private readonly currencies: Repository<CurrencyEntity>,
  ) {}

  create(createCurrencyDto: CreateCurrencyDto) {
    return this.currencies.save({ ...createCurrencyDto });
  }

  findAll() {
    return this.currencies.find();
  }

  findOne(id: number): Promise<CurrencyEntity> {
    return this.currencies.findOne({
      where: {
        currencyId: id,
      },
    });
  }

  findByName(name: string): Promise<CurrencyEntity> {
    return this.currencies.findOne({
      where: {
        name,
      },
    });
  }

  update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return `This action updates a #${id} currency`;
  }

  remove(id: number) {
    return this.currencies.delete(id);
  }
}
