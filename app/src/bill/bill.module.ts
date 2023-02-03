import { Module } from '@nestjs/common';
import { CdrService } from '../cdr/cdr.service';
import { OrganisationService } from '../organisation/organisation.service';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { SimService } from '../sim/sim.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimEntity } from 'src/sim/entities/sim.entity';
import { OrganisationEntity } from 'src/db/entitys/organisation.entity';
import { CdrEntity } from 'src/cdr/entities/cdr.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SimEntity, OrganisationEntity, CdrEntity]),
  ],
  controllers: [BillController],
  providers: [BillService, SimService, OrganisationService, CdrService],
})
export class BillModule {}
