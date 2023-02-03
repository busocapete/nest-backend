import { RateZoneEntity } from 'src/db/entitys/rateZone.entity';
import { RateEntity } from 'src/rate/entities/rate.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { RateEntity } from '../../db/entitys/rate.entity';
// import { RateZoneEntity } from '../../db/entitys/rateZone.entity';

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

  //   @Column({ name: 'timestamp' })
  //   timeStamp: Date;

  @ManyToOne(() => RateEntity, (rate) => rate, {
    eager: true,
  })
  @JoinColumn({ name: 'rateZone_Id' })
  rate: RateEntity;

  @ManyToOne(() => RateZoneEntity, (rateZone) => rateZone, {
    eager: true,
  })
  @JoinColumn({ name: 'rateZone_Id' })
  rateZone: RateZoneEntity;

  // readonly totalCostPercdr //!!totalBillCost
  cdrCost: number;
}
