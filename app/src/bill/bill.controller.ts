import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  Version,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { OrganisationService } from '../organisation/organisation.service';
import { BillService } from './bill.service';
import { CurrencyService } from '../currency/currency.service';
import BillResponseDto from './dto/bill-response.dto';
import { GetUser } from '../auth/decorator';
import { UserEntity } from '../auth/entities/user.entity';
import { JwtGuard, OrganisationGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('organisations/:id/bill')
export class BillController {
  constructor(
    private readonly billService: BillService,
    private readonly organisationService: OrganisationService,
    private readonly currencyService: CurrencyService,
  ) {}
  @Get()
  //auth/guards/organisation.guard
  //to ensure only admin or org owners can view
  @UseGuards(OrganisationGuard)
  @Version('1')
  async get(
    @GetUser() userInfo: UserEntity,
    @Headers() Headers,

    //would set org id as UUID for security
    //@Param('id') id: string, /83ea1c1c-a8b7-11ed-afa1-0242ac120002
    @Param('id', ParseIntPipe) id: number,
    @Query('currency')
    currencyQuery: string,
    //Would need to add support for billing periods
    //based on returning all sim.cdrs(
    //{ where: {
    //date >= PeriodEnd && date >= PeriodEnd + months(-1)
    //}})

    //@Query('start_date') startDate: Date,
    //@Query('end_date') endDate: Date,
  ): Promise<BillResponseDto> {
    console.log('Bill Controller', userInfo);

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

    //Bill.organisation.sims && || bill.organisation.cdrs
    //would likely require some sort of pagination
    //to ensure quick responses
    //3x cdr entries && 3x sims per organisation
    //isn't realistic test data.

    //return as BillDto extending response Dto
    //implement across all controllers.

    //have hardcoded user / message / status for ease
    //would include user.
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
