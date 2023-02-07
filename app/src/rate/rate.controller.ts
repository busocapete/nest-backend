import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateRateDto } from './dto/create-rate.dto';
import { RateService } from './rate.service';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Get()
  findAll() {
    return this.rateService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const rateToReturn = await this.rateService.findById(+id);

    console.log(rateToReturn);

    if (rateToReturn === null) {
      throw new HttpException('Rate Not Found', HttpStatus.NOT_FOUND);
    }

    return rateToReturn;
  }

  @Post()
  create(@Body() dto: CreateRateDto) {
    return this.rateService.create(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.rateService.delete(+id);
  }
}
