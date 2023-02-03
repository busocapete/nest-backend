import { Module } from '@nestjs/common';
import { CdrService } from './cdr.service';
import { CdrController } from './cdr.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CdrEntity } from './entities/cdr.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CdrEntity])],

  controllers: [CdrController],
  providers: [CdrService],
})
export class CdrModule {}
