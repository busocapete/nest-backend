import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TariffService } from './tariff.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';

@Controller('tariffs')
export class TariffController {
  constructor(private readonly tariffService: TariffService) {}

  @Post()
  create(@Body() createTariffDto: CreateTariffDto) {
    return this.tariffService.create(createTariffDto);
  }

  @Get()
  findAll() {
    return this.tariffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tariffService.findById(+id);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tariffService.remove(+id);
  }
}
