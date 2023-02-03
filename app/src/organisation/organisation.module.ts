import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganisationEntity } from 'src/db/entitys/organisation.entity';
import { OrganisationController } from './organisation.controller';
import { OrganisationService } from './organisation.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrganisationEntity])],
  providers: [OrganisationService],
  controllers: [OrganisationController],
})
export class OrganisationModule {}