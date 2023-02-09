import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { CreateSimDto } from './dto/create-sim.dto';
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
      where: { organisationId: orgId },
      select: { simId: true, iccid: true },
    });
  }

  async create(createSimDto: CreateSimDto): Promise<SimEntity> {
    const simToAdd = new SimEntity();
    simToAdd.organisationId = createSimDto.organisationId;
    simToAdd.registered = new Date(Date.now());
    simToAdd.iccid = randomUUID();
    return this.sims.save(simToAdd);
  }
  async remove(id: string): Promise<void> {
    await this.sims.delete(id);
  }
}
