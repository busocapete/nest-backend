import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {OrganisationEntity} from './entitys/organisation.entity';

export const entities = [OrganisationEntity];

export const dbConfigFactory: () => Promise<TypeOrmModuleOptions> = async () => ({
  type: 'mariadb',
  host: 'host.docker.internal',
  port: 3306,
  username: 'root',
  password: process.env.MARIADB_ROOT_PASSWORD,
  database: 'emnify',
  entities,
  synchronize: false,
});
