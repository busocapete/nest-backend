import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rateZone')
export class RateZoneEntity {
  @PrimaryGeneratedColumn({ name: 'ratezone_id' })
  rateZoneId: number;

  @Column({ name: 'name' })
  name: string;
}
