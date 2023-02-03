import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rate')
export class RateEntity {
  @PrimaryGeneratedColumn({ name: 'rate_id' })
  rateId: number;

  @Column({ name: 'ratezone_id' })
  rateZoneId: number;

  @Column({ name: 'amount_per_volume' })
  amountPerVolume: number;
}
