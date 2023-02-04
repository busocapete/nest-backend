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
    return this.organisations.find({
      relations: {
        sims: true,
      },
    });
  }

  findById(id: number): Promise<OrganisationEntity> {
    return this.organisations.findOne({
      where: { organisationId: id },
    });
  }

  findByIdIncludeSimsAndCdrs(id: number): Promise<OrganisationEntity> {
    return this.organisations.findOne({
      where: { organisationId: id },
      relations: ['sims', 'sims.cdrs'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.organisations.delete(id);
  }
}
