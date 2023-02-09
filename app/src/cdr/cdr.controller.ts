import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { CdrService } from './cdr.service';
import { CreateCdrDto } from './dto/create-cdr.dto';
import { CdrEntity } from './entities/cdr.entity';

@Controller('cdrs')
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

  @Post()
  create(@Body() createCdrDto: CreateCdrDto): Promise<CdrEntity> {
    return this.cdrService.create(createCdrDto);
  }
}
