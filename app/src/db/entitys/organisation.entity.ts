import { SimEntity } from 'src/sim/entities/sim.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('organisation')
export class OrganisationEntity {
  @PrimaryGeneratedColumn({ name: 'organisation_id' })
  organisationId: number;

  @Column({ name: 'name' })
  name: string;

  //readonly - not mapped
  totalBillCost: number;

  defaultCurrency = 'EUR';

  @OneToMany(() => SimEntity, (sim) => sim.organisation)
  sims: SimEntity[];
}
