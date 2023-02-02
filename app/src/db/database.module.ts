import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConfigFactory, entities} from './databaseProviders';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: dbConfigFactory
    }),
    TypeOrmModule.forFeature(entities)
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {
}
