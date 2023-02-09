import { CurrencyEntity } from '../../currency/entities/currency.entity';
import { SimEntity } from '../../sim/entities/sim.entity';
import { TariffEntity } from '../../tariff/entities/tariff.entity';
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
  //would change to UUID for security
  // ie. couldn't call organisations/1 organisations/2 ....
  // much better as organisations/83ea1c1c-a8b7-11ed-afa1-0242ac120002
  @PrimaryGeneratedColumn({ name: 'organisation_id' })
  organisationId: number;
  //organisationId: string; e.g. /83ea1c1c-a8b7-11ed-afa1-0242ac120002

  @Column({ name: 'name' })
  name: string;

  //readonly for billing purposes - not mapped
  //would move to a bill dto and map org response if time permitted
  totalUsageCost: number;

  //readonly for billing purposes - not mapped
  //would move to a bill dto and map org response if time permitted
  displayTotalUsageCost: string;

  //readonly for billing purposes - not mapped
  //would move to a bill dto and map org response if time permitted
  totalSubscriptionCost: number;

  //readonly for billing purposes - not mapped
  //would move to a bill dto and map org response if time permitted
  displayTotalSubscriptionCost: string;

  //readonly for billing purposes - not mapped
  //would move to a bill dto and map org response if time permitted
  totalBillCost: number;

  //readonly for billing purposes - not mapped
  //would move to a bill dto and map org response if time permitted
  displayTotalBillCost: string;

  //Sims would be better to own the
  //subscription so that org
  //could mix & match PAYG and inclusive contracts
  //out of scope for assessment
  @OneToMany(() => SimEntity, (sim) => sim.organisation)
  sims: SimEntity[];

  @Column({ name: 'currency_id' })
  defaultCurrencyId: number;

  //wouldn't eager load in production
  //could add @Query or @Header parameters
  //on controller to deterine response data
  @OneToOne(() => CurrencyEntity, (currency) => currency, { eager: true })
  @JoinColumn({ name: 'currency_id' })
  defaultCurrency: CurrencyEntity;

  //Would require array of tariffs
  //to enable swapping between PAYG and Inclusive
  //upgrading / downgrading possibiliies
  @Column({ name: 'tariff_id' })
  tariffId: number;

  //wouldn't eager load in production
  //could add @Query or @Header parameters
  //on controller to deterine response data
  @OneToOne(() => TariffEntity, (tariff) => tariff, { eager: true })
  @JoinColumn({ name: 'tariff_id' })
  tariff: TariffEntity;

  // would implement isDeleted booleans
  // instead of deleting objects completely
  //@Column({ name: 'is_deleted'})
  //isDeleted: boolean
}
