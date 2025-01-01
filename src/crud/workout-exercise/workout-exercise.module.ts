import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { WorkoutExerciseService } from './workout-exercise.service';
import { WorkoutExerciseController } from './workout-exercise.controller';
import { WorkoutExerciseRepository } from './workout-exercise.repository';

@Module({
  imports: [PrismaModule],
  controllers: [WorkoutExerciseController],
  providers: [WorkoutExerciseService, WorkoutExerciseRepository],
})
export class WorkoutExerciseModule {}
