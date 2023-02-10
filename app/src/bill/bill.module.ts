import { Module } from '@nestjs/common';
import { CdrService } from '../cdr/cdr.service';
import { OrganisationService } from '../organisation/organisation.service';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { SimService } from '../sim/sim.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimEntity } from '../sim/entities/sim.entity';
import { OrganisationEntity } from '../organisation/entities/organisation.entity';
import { CdrEntity } from '../cdr/entities/cdr.entity';
import { CurrencyEntity } from '../currency/entities/currency.entity';
import { CurrencyService } from '../currency/currency.service';
import { TariffEntity } from '../tariff/entities/tariff.entity';
import { TariffService } from '../tariff/tariff.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SimEntity,
      OrganisationEntity,
      CdrEntity,
      CurrencyEntity,
      TariffEntity,
    ]),
  ],
  controllers: [BillController],
  providers: [
    BillService,
    SimService,
    OrganisationService,
    CdrService,
    CurrencyService,
    TariffService,
  ],
})
export class BillModule {}
