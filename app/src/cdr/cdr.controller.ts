import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CdrService } from './cdr.service';
import { CreateCdrDto } from './dto/create-cdr.dto';
import { UpdateCdrDto } from './dto/update-cdr.dto';

@Controller('cdr')
export class CdrController {
  constructor(private readonly cdrService: CdrService) {}

  // @Post()
  // create(@Body() createCdrDto: CreateCdrDto) {
  //   return this.cdrService.create(createCdrDto);
  // }

  @Get()
  findAll() {
    return this.cdrService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cdrService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCdrDto: UpdateCdrDto) {
  //   return this.cdrService.update(+id, updateCdrDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cdrService.remove(+id);
  }
}
