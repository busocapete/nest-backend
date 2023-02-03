import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
