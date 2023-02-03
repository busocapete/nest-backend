import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SimEntity } from './entities/sim.entity';

@Injectable()
export class SimService {
  constructor(
    @InjectRepository(SimEntity)
    private readonly sims: Repository<SimEntity>,
  ) {}

  findAll(): Promise<SimEntity[]> {
    return this.sims.find();
  }

  findById(id: number): Promise<SimEntity> {
    return this.sims.findOne({
      where: {
        simId: id,
      },
    });
  }

  findByOrgId(orgId: number): Promise<SimEntity[]> {
    return this.sims.find({
      where: { organisationid: orgId },
      select: { simId: true, iccid: true },
    });
  }
}
