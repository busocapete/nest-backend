import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrgansiationDto } from './dto/create-organisation.dto';
import { OrganisationEntity } from './entities/organisation.entity';
import { CurrencyEntity } from '../currency/entities/currency.entity';
import { TariffEntity } from '../tariff/entities/tariff.entity';

@Injectable()
export class OrganisationService {
  constructor(
    @InjectRepository(OrganisationEntity)
    private readonly organisations: Repository<OrganisationEntity>,
    @InjectRepository(CurrencyEntity)
    private readonly currencies: Repository<CurrencyEntity>,
    @InjectRepository(TariffEntity)
    private readonly tariffs: Repository<TariffEntity>,
  ) {}

  findAll(): Promise<OrganisationEntity[]> {
    return this.organisations.find({
      relations: {
        sims: true,
      },
    });
  }

  findById(id: number): Promise<OrganisationEntity> {
    return this.organisations.findOne({
      where: { organisationId: id },
    });
  }

  findByIdIncludeSimsAndCdrs(id: number): Promise<OrganisationEntity> {
    return this.organisations.findOne({
      where: { organisationId: id },
      relations: [
        'tariff',
        'sims',
        'sims.cdrs',
        'sims.cdrs.rate',
        'sims.cdrs.rate.ratezone',
      ],
    });
  }

  async create(
    createOrganisationDto: CreateOrgansiationDto,
  ): Promise<OrganisationEntity> {
    // const currency = await this.currencies.findOne({
    //   where: {
    //     currencyId: createOrganisationDto.defaultCurrencyId,
    //   },
    // });

    // const tariff = await this.tariffs.findOne({
    //   where: {
    //     tariffId: createOrganisationDto.tariffId,
    //   },
    // });

    // const orgToAdd = new OrganisationEntity();

    // orgToAdd.name = createOrganisationDto.name;
    // orgToAdd.defaultCurrency = currency;
    // orgToAdd.tariff = tariff;

    return this.organisations.save({ ...createOrganisationDto });
  }

  async remove(id: string): Promise<void> {
    await this.organisations.delete(id);
  }
}
