import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ApikeyService } from 'src/modules/apikey/apikey.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { ApikeyRepository } from 'src/modules/apikey/apikey.repository';

@Module({
  imports: [PrismaModule],
  controllers: [],
  exports: [EventsGateway],
  providers: [ApikeyRepository, ApikeyService, EventsGateway]
})
export class GatewayModule {}
