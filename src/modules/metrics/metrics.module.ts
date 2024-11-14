import { PrismaModule } from '../../database/prisma/prisma.module';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { Module } from '@nestjs/common';
import { EventsGateway } from 'src/modules/gateway/events.gateway';
import { ApikeyService } from 'src/modules/apikey/apikey.service';
import { ApikeyRepository } from 'src/modules/apikey/apikey.repository';
import { UserModule } from 'src/modules/user/user.module';
import { GatewayModule } from '../gateway/gateway.module';
import { UserActivityRegistry } from 'src/modules/user/user.registry';
@Module({
  providers: [MetricsService, EventsGateway, ApikeyRepository, ApikeyService],
  controllers: [MetricsController],
  exports: [MetricsService],
  imports: [PrismaModule, UserModule, UserActivityRegistry, GatewayModule]
})
export class MetricsModule {}
