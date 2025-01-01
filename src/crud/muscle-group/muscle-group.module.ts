import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { MuscleGroupService } from './muscle-group.service';
import { MuscleGroupController } from './muscle-group.controller';

@Module({
  imports: [PrismaModule],
  controllers: [MuscleGroupController],
  providers: [MuscleGroupService],
})
export class MuscleGroupModule {}
