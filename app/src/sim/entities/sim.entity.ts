import { CdrEntity } from 'src/cdr/entities/cdr.entity';
import { OrganisationEntity } from 'src/db/entitys/organisation.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sim')
export class SimEntity {
  @PrimaryGeneratedColumn({ name: 'sim_id' })
  simId: number;

  @Column({ name: 'organisation_id' })
  organisationid: number;

  @Column({ name: 'iccid' })
  iccid: string;

  @Column({ name: 'registered_at' })
  registered: Date;

  @ManyToOne(() => OrganisationEntity, (organisation) => organisation.sims)
  @JoinColumn({ name: 'organisation_id' })
  organisation: OrganisationEntity;

  @OneToMany(() => CdrEntity, (cdr) => cdr.sim)
  cdrs: CdrEntity[];

  //readonly costPerSim
  simCost: number;
}
