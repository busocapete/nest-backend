import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CdrService } from 'src/cdr/cdr.service';
import { BillDto } from './dto/bill.dto';
import { OrganisationService } from '../organisation/organisation.service';
import { SimService } from '../sim/sim.service';
import { BillService } from './bill.service';
import { CurrencyService } from 'src/currency/currency.service';
import BillResponseDto from './dto/bill-response.dto';

@Controller('organisation/:id/bill')
export class BillController {
  constructor(
    private readonly billService: BillService,
    private readonly simService: SimService,
    private readonly organisationService: OrganisationService,
    private readonly cdrsService: CdrService,
    private readonly currencyService: CurrencyService,
  ) {}
  @Get()
  async get(
    @Param('id', ParseIntPipe) id: number,
    @Query('currency') currencyQuery: string,
  ): Promise<BillResponseDto> {
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

    let selectedCurrency = await this.currencyService.findByName(currencyQuery);

    if (selectedCurrency === null) {
      selectedCurrency = await this.currencyService.findByName('EUR');
    }

    console.log(selectedCurrency);

    //Calculate Total Cost
    const totalCost = this.billService.calculateTotalCostofCdrs(cdrs);

    //return as BillDTO
    return {
      statusCode: 200,
      message: 'success',
      user: 1,
      timeStamp: Date.now(),
      data: {
        organisationName: organisation.name,
        currency: selectedCurrency,
        totalCost: totalCost * selectedCurrency.rate,
        usage: cdrs.sort((a, b) => a.rateZoneId - b.rateZoneId),
      },
    };
  }
}
