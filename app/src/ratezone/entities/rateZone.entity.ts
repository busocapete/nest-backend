import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ratezone')
export class RateZoneEntity {
  @PrimaryGeneratedColumn({ name: 'ratezone_id' })
  rateZoneId: number;

  @Column({ name: 'name' })
  name: string;
}
