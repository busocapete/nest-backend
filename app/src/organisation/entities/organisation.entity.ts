import { CurrencyEntity } from 'src/currency/entities/currency.entity';
import { SimEntity } from 'src/sim/entities/sim.entity';
import { TariffEntity } from 'src/tariff/entities/tariff.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('organisation')
export class OrganisationEntity {
  @PrimaryGeneratedColumn({ name: 'organisation_id' })
  organisationId: number;

  @Column({ name: 'name' })
  name: string;

  //readonly - not mapped
  totalUsageCost: number;

  //readonly - not mapped
  displayTotalUsageCost: string;

  totalSubscriptionCost: number;

  displayTotalSubscriptionCost: string;

  totalBillCost: number;

  displayTotalBillCost: string;

  @OneToMany(() => SimEntity, (sim) => sim.organisation)
  sims: SimEntity[];

  @OneToOne(() => CurrencyEntity, (currency) => currency, { eager: true })
  @JoinColumn({ name: 'currency_id' })
  defaultCurrency: CurrencyEntity;

  @OneToOne(() => TariffEntity, (tariff) => tariff, { eager: true })
  @JoinColumn({ name: 'tariff_id' })
  tariff: TariffEntity;
}
