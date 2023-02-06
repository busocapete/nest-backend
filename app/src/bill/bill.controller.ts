import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  Version,
} from '@nestjs/common';
import { OrganisationService } from '../organisation/organisation.service';
import { BillService } from './bill.service';
import { CurrencyService } from 'src/currency/currency.service';
import BillResponseDto from './dto/bill-response.dto';

@Controller('organisation/:id/bill')
export class BillController {
  constructor(
    private readonly billService: BillService,
    private readonly organisationService: OrganisationService,
    private readonly currencyService: CurrencyService,
  ) {}
  @Get()
  @Version('1')
  async get(
    @Param('id', ParseIntPipe) id: number,
    @Query('currency') currencyQuery: string,
  ): Promise<BillResponseDto> {
    //Get organisation with sims & cdrs
    const organisation =
      await this.organisationService.findByIdIncludeSimsAndCdrs(id);

    if (organisation === null) {
      throw new HttpException('Organisation Not Found', HttpStatus.NOT_FOUND);
    }

    let selectedCurrency = organisation.defaultCurrency;

    //Covert currency from url query and override org.defaultCurrency if
    //currencyQuery is present
    if (currencyQuery !== undefined) {
      selectedCurrency = await this.currencyService.findByName(currencyQuery);
    }

    //convert costs with selected currency rate
    const organisationToReturn =
      await this.billService.convertToSelectedCurrency(
        organisation,
        selectedCurrency,
      );

    //return as BillDTO
    return {
      statusCode: 200,
      message: 'success',
      user: 1,
      timeStamp: Date.now(),
      data: {
        organisation: organisationToReturn,
        billDisplayCurrency: selectedCurrency,
      },
    };
  }
}
