import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { OrganisationEntity } from './organisation/entities/organisation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(OrganisationEntity)
    private readonly organisations: Repository<OrganisationEntity>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
