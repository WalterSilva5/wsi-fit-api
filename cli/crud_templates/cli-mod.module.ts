import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { CliModService } from './cli-mod.service';
import { CliModController } from './cli-mod.controller';
import { CliModRepository } from './cli-mod.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CliModController],
  providers: [CliModService, CliModRepository],
})
export class CliModModule {}
