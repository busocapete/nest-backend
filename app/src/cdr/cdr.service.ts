import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCdrDto } from './dto/create-cdr.dto';
import { CdrEntity } from './entities/cdr.entity';

@Injectable()
export class CdrService {
  constructor(
    @InjectRepository(CdrEntity)
    private readonly cdrs: Repository<CdrEntity>,
  ) {}

  findAll(): Promise<CdrEntity[]> {
    return this.cdrs.find();
  }

  findOne(id: number): Promise<CdrEntity> {
    return this.cdrs.findOne({
      where: {
        cdrId: id,
      },
    });
  }

  async getBySimIds(simIds: number[]): Promise<CdrEntity[]> {
    return this.cdrs.findBy({
      simId: In(simIds),
    });
  }

  async remove(id: number): Promise<void> {
    await this.cdrs.delete(id);
  }

  async create(createCdrDto: CreateCdrDto): Promise<CdrEntity> {
    return this.cdrs.save({ ...createCdrDto });
  }
}
