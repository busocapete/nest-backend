import { Module } from '@nestjs/common';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateEntity } from './entities/rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RateEntity])],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
