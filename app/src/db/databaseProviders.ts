import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CdrEntity } from '../cdr/entities/cdr.entity';
import { OrganisationEntity } from './entitys/organisation.entity';
import { SimEntity } from '../sim/entities/sim.entity';

export const entities = [OrganisationEntity, CdrEntity, SimEntity];

export const dbConfigFactory: () => Promise<TypeOrmModuleOptions> =
  async () => ({
    type: 'mariadb',
    host: 'host.docker.internal',
    port: 3306,
    username: 'root',
    password: process.env.MARIADB_ROOT_PASSWORD,
    database: 'emnify',
    entities,
    synchronize: false,
  });
