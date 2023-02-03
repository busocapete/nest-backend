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

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    OrganisationModule,
    CdrModule,
    SimModule,
  ],
  controllers: [AppController, OrganisationController, CdrController],
  providers: [AppService, OrganisationService, CdrService],
})
export class AppModule {}
