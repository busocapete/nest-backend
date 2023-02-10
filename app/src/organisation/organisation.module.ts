import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TariffEntity } from '../tariff/entities/tariff.entity';
import { CurrencyEntity } from '../currency/entities/currency.entity';
import { OrganisationEntity } from '../organisation/entities/organisation.entity';
import { OrganisationController } from './organisation.controller';
import { OrganisationService } from './organisation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrganisationEntity,
      CurrencyEntity,
      TariffEntity,
    ]),
  ],
  providers: [OrganisationService],
  controllers: [OrganisationController],
})
export class OrganisationModule {}
