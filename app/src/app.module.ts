import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { OrganisationController } from './organisation/organisation.controller';
import { OrganisationModule } from './organisation/organisation.module';
import { OrganisationService } from './organisation/organisation.service';
import { CdrModule } from './cdr/cdr.module';
import { CdrController } from './cdr/cdr.controller';
import { CdrService } from './cdr/cdr.service';
import { SimModule } from './sim/sim.module';
import { RateModule } from './rate/rate.module';
import { BillController } from './bill/bill.controller';
import { SimService } from './sim/sim.service';
import { BillService } from './bill/bill.service';
import { BillModule } from './bill/bill.module';
import { CurrencyModule } from './currency/currency.module';
import { CurrencyService } from './currency/currency.service';
import { TariffModule } from './tariff/tariff.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    OrganisationModule,
    CdrModule,
    SimModule,
    RateModule,
    BillModule,
    CurrencyModule,
    TariffModule,
  ],
  controllers: [
    AppController,
    OrganisationController,
    CdrController,
    BillController,
  ],
  providers: [
    AppService,
    OrganisationService,
    CdrService,
    SimService,
    BillService,
    CurrencyService,
  ],
})
export class AppModule {}
