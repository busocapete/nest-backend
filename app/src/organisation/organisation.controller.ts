import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrganisationService } from './organisation.service';

@Controller('organisation')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Get(':id')
  async getOrganisation(@Param('id', ParseIntPipe) id: number) {
    return this.organisationService.findOne(id);
  }

  @Get()
  async getOrganisationList() {
    return this.organisationService.findAll();
  }
}
