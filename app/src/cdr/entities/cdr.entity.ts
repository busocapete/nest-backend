import { RateEntity } from '../../rate/entities/rate.entity';
import { SimEntity } from '../../sim/entities/sim.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cdr')
export class CdrEntity {
  @PrimaryGeneratedColumn({ name: 'cdr_id' })
  cdrId: number;

  @Column({ name: 'sim_id' })
  simId: number;

  @Column({ name: 'ratezone_id' })
  rateZoneId: number;

  @Column({ name: 'volume' })
  volume: number;

  @ManyToOne(() => RateEntity, (rate) => rate, {
    eager: true,
  })
  @JoinColumn({ name: 'ratezone_id' })
  rate: RateEntity;

  @ManyToOne(() => SimEntity, (sim) => sim.cdrs)
  @JoinColumn({ name: 'sim_id' })
  sim: SimEntity;

  // readonly totalCostPercdr //!!totalBillCost
  cdrCost: number;

  displayCurrency: string;

  displayCdrCost: string;
}
