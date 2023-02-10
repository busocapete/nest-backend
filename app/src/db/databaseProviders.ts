import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CdrEntity } from '../cdr/entities/cdr.entity';
import { OrganisationEntity } from '../organisation/entities/organisation.entity';
import { SimEntity } from '../sim/entities/sim.entity';
import { RateEntity } from '../rate/entities/rate.entity';
import { RateZoneEntity } from '../ratezone/entities/rateZone.entity';
import { CurrencyEntity } from '../currency/entities/currency.entity';
import { OrganisationSubscriber } from '../organisation/organisation.subscriber';
import { TariffEntity } from '../tariff/entities/tariff.entity';
import { UserEntity } from '../auth/entities/user.entity';

export const entities = [
  OrganisationEntity,
  CdrEntity,
  SimEntity,
  RateZoneEntity,
  RateEntity,
  CurrencyEntity,
  TariffEntity,
  UserEntity,
];

export const dbConfigFactory: () => Promise<TypeOrmModuleOptions> =
  async () => ({
    type: 'mariadb',
    host: 'host.docker.internal',
    port: Number.parseInt(process.env.MARIADB_PORT),
    username: 'root',
    password: process.env.MARIADB_ROOT_PASSWORD,
    database: 'emnify',
    entities,
    synchronize: false,
    subscribers: [OrganisationSubscriber],

    // migrations: [
    //   /*initial_migration*/
    //   /*...*/
    // ],
    // migrationsTableName: 'custom_migration_table',
  });
