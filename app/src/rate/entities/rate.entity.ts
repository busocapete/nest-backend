import { RateZoneEntity } from '../../ratezone/entities/rateZone.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('rate')
export class RateEntity {
  @PrimaryGeneratedColumn({ name: 'rate_id' })
  rateId: number;

  @Column({ name: 'ratezone_id' })
  ratezoneId: number;

  @Column({ name: 'amount_per_volume' })
  amountPerVolume: number;

  @OneToOne(() => RateZoneEntity, (ratezone) => ratezone)
  @JoinColumn({ name: 'ratezone_id' })
  ratezone: RateZoneEntity;
}
