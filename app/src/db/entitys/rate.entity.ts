import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RateZoneEntity } from './rateZone.entity';

@Entity('rate')
export class RateEntity {
  @PrimaryGeneratedColumn({ name: 'rate_id' })
  rateId: number;

  @Column({ name: 'ratezone_id' })
  rateZoneId: number;

  @Column({ name: 'amount_per_volume' })
  amountPerVolume: number;

  @OneToOne(() => RateZoneEntity, (rateZone) => rateZone, { eager: true })
  @JoinColumn({ name: 'ratezone_id' })
  rateZone: RateZoneEntity;
}
