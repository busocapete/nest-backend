import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CdrEntity } from './entities/cdr.entity';

@Injectable()
export class CdrService {
  constructor(
    @InjectRepository(CdrEntity)
    private readonly cdrs: Repository<CdrEntity>,
  ) {}
  // create(createCdrDto: CreateCdrDto) {
  //   return 'This action adds a new cdr';
  // }

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

  // update(id: number, updateCdrDto: UpdateCdrDto) {
  //   return `This action updates a #${id} cdr`;
  // }

  async remove(id: number): Promise<void> {
    await this.cdrs.delete(id);
  }
}
