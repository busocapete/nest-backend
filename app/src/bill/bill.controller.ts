import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CdrService } from 'src/cdr/cdr.service';
import { BillDto } from './dto/bill.dto';
import { OrganisationService } from '../organisation/organisation.service';
import { SimService } from '../sim/sim.service';
import { BillService } from './bill.service';

@Controller('organisation/:id/bill')
export class BillController {
  constructor(
    private readonly billService: BillService,
    private readonly simService: SimService,
    private readonly organisationService: OrganisationService,
    private readonly cdrsService: CdrService,
  ) {}
  @Get()
  async get(@Param('id', ParseIntPipe) id: number): Promise<BillDto> {
    //Get organisation
    const organisation = await this.organisationService.findOne(id);

    if (organisation === null) {
      throw new HttpException('Organisation Not Found', HttpStatus.NOT_FOUND);
    }

    //Get sims for Organisation
    const sims = await this.simService.findByOrgId(id);

    if (sims === null || sims.length === 0) {
      throw new HttpException(
        'No sims are registered for this organisation',
        HttpStatus.NOT_FOUND,
      );
    }

    //Get CDR's for Organisations Sim Ids
    const cdrs = await this.cdrsService.getBySimIds(
      sims.map(({ simId }) => simId),
    );

    //Calculat Total Cost
    const totalCost = this.billService.calculateTotalCostofCdrs(cdrs);

    //return as BillDTO
    return {
      organisationName: organisation.name,
      totalCost,
      usage: cdrs.sort((a, b) => a.rateZoneId - b.rateZoneId),
    };
  }
}
