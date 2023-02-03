import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { OrganisationController } from './organisation/organisation.controller';
import { OrganisationModule } from './organisation/organisation.module';
import { OrganisationService } from './organisation/organisation.service';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, OrganisationModule],
  controllers: [AppController, OrganisationController],
  providers: [AppService, OrganisationService],
})
export class AppModule {}
