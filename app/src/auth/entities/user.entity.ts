import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  //IsUUID,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  //Would Use UUID in real life
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @IsEmail()
  @IsNotEmpty()
  @Column({ name: 'email', unique: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'hash' })
  hash: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  //potentially have this as a scope in token
  @IsNumber()
  @Column({ name: 'organisation_id' })
  organisationId: number;

  //would have this a a role stored in token
  //in real project
  @IsBoolean()
  @Column({ name: 'is_admin' })
  isAdmin: boolean;
}
