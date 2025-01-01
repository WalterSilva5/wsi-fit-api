import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { WorkoutRepository } from './workout.repository';

@Module({
  imports: [PrismaModule],
  controllers: [WorkoutController],
  providers: [WorkoutService, WorkoutRepository],
})
export class WorkoutModule {}
