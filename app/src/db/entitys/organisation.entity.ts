import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('organisation')
export class OrganisationEntity {
  @PrimaryGeneratedColumn({name: 'organisation_id'})
  organisationId: number;

  @Column({name: 'name'})
  name: string;
}
