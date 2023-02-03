import { Controller, Get, Param } from '@nestjs/common';
import { SimService } from './sim.service';

@Controller('sim')
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
}
