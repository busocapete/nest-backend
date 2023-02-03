import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CdrService } from 'src/cdr/cdr.service';
import { OrganisationService } from 'src/organisation/organisation.service';
import { SimService } from 'src/sim/sim.service';

@Controller('organisation/:id/bill')
export class BillController {
  constructor(
    private readonly simService: SimService,
    private readonly organisationService: OrganisationService,
    private readonly cdrsService: CdrService,
  ) {}
  @Get()
  async get(@Param('id', ParseIntPipe) id: number) {
    const organisation = await this.organisationService.findOne(id);

    if (organisation === null) {
      throw new HttpException('Organisation Not Found', HttpStatus.NOT_FOUND);
    }
    const sims = await this.simService.findByOrgId(id);

    const simIds = sims.map(({ simId }) => simId);

    const cdrs = await this.cdrsService.getBySimIds(simIds);

    // console.log(cdrs);

    // let totalCost = 0;
    // cdrs.map((cdr) => {
    //   return (totalCost += cdr.cdrCost);
    // });

    // console.log(cdrs.reduce((n, { cdrCost }) => n + cdrCost, 0));

    return {
      organisation: organisation.name,
      //totalBill: totalCost,
      usage: cdrs,
    };
  }
}
