import { PrismaModule } from '../../database/prisma/prisma.module';
import { ApikeyController } from './apikey.controller';
import { ApikeyRepository } from './apikey.repository';
import { ApikeyService } from './apikey.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [ApikeyService, ApikeyRepository],
  controllers: [ApikeyController],
  exports: [ApikeyService],
  imports: [PrismaModule]
})
export class ApikeyModule {}
