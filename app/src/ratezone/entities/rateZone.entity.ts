import { RateEntity } from '../../rate/entities/rate.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ratezone')
export class RateZoneEntity {
  @PrimaryGeneratedColumn({ name: 'ratezone_id' })
  rateZoneId: number;

  @Column({ name: 'name' })
  name: string;

  @OneToMany(() => RateEntity, (rate) => rate.ratezone)
  rate: RateEntity;
}
