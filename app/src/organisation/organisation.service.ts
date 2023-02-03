import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganisationEntity } from '../db/entitys/organisation.entity';

@Injectable()
export class OrganisationService {
  constructor(
    @InjectRepository(OrganisationEntity)
    private readonly organisations: Repository<OrganisationEntity>,
  ) {}

  findAll(): Promise<OrganisationEntity[]> {
    return this.organisations.find();
  }

  findOne(id: number): Promise<OrganisationEntity> {
    return this.organisations.findOne({ where: { organisationId: id } });
  }

  async remove(id: string): Promise<void> {
    await this.organisations.delete(id);
  }
}
