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
import { TariffService } from './tariff/tariff.service';
import { RatezoneController } from './ratezone/ratezone.controller';
import { RatezoneService } from './ratezone/ratezone.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    OrganisationModule,
    CdrModule,
    SimModule,
    RateModule,
    BillModule,
    CurrencyModule,
    TariffModule,
    AuthModule,
    ConfigModule,
  ],
  controllers: [
    AppController,
    OrganisationController,
    CdrController,
    BillController,
    RatezoneController,
  ],
  providers: [
    AppService,
    OrganisationService,
    CdrService,
    SimService,
    BillService,
    CurrencyService,
    TariffService,
    RatezoneService,
    AuthService,
    JwtService,
  ],
})
export class AppModule {}
