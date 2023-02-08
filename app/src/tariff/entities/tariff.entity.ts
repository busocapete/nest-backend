export class Tariff {}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tariff')
export class TariffEntity {
  @PrimaryGeneratedColumn({ name: 'tariff_id' })
  tariffId: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'subscription_cost_per_sim' })
  subscriptionCostPerSim: number;

  @Column({ name: 'inclusive_volume' })
  inclusiveVolume: number;

  @Column({ name: 'payg' })
  isPayg: boolean;

  @Column({ name: 'active_from' })
  activeFrom: Date;

  @Column({ name: 'active_to' })
  activeTo: Date;
}
