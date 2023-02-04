import { Controller, Get, Param, ParseIntPipe, Version } from '@nestjs/common';
import { OrganisationService } from './organisation.service';

@Controller('organisation')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Get(':id')
  @Version('1')
  async getOrganisation(@Param('id', ParseIntPipe) id: number) {
    return this.organisationService.findById(id);
  }

  @Get()
  @Version('1')
  async getOrganisationList() {
    return this.organisationService.findAll();
  }
}
