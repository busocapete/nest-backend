import {Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import {Repository} from 'typeorm';
import {AppService} from './app.service';
import {OrganisationEntity} from './db/entitys/organisation.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(OrganisationEntity)
    private readonly organisations: Repository<OrganisationEntity>
  ) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/organisation/:id')
  async getOrganisation(@Param('id', ParseIntPipe) id: number) {
    return this.organisations.findOne({where: {organisationId: id}});
  }
}


