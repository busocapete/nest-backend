import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { CreateSimDto } from './dto/create-sim.dto';
import { SimService } from './sim.service';

@Controller('sims')
export class SimController {
  constructor(private readonly simService: SimService) {}

  @Get()
  findAll() {
    return this.simService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.simService.findById(+id);
  }

  @Post()
  create(@Body() createSimDto: CreateSimDto) {
    return this.simService.create(createSimDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.simService.remove(id);
  }
}
