import { PrismaModule } from '../../database/prisma/prisma.module';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { UserActivityRegistry } from 'src/modules/user/user.registry';
@Module({
  providers: [MetricsService],
  controllers: [MetricsController],
  exports: [MetricsService],
  imports: [PrismaModule, UserModule, UserActivityRegistry]
})
export class MetricsModule {}
