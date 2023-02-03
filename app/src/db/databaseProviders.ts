import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CdrEntity } from '../cdr/entities/cdr.entity';
import { OrganisationEntity } from './entitys/organisation.entity';
import { SimEntity } from '../sim/entities/sim.entity';
import { RateEntity } from '../rate/entities/rate.entity';
import { RateZoneEntity } from './entitys/rateZone.entity';
import { CdrSubscriber } from 'src/cdr/cdr.subscriber';
import { CurrencyEntity } from 'src/currency/entities/currency.entity';

export const entities = [
  OrganisationEntity,
  CdrEntity,
  SimEntity,
  RateEntity,
  RateZoneEntity,
  CurrencyEntity,
];

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
    subscribers: [CdrSubscriber],
  });
