import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { WorkoutExerciseController } from './workout-exercise.controller';
import { WorkoutExerciseRepository } from './workout-exercise.repository';
import { WorkoutExerciseService } from './workout-exercise.service';

describe('WorkoutExerciseController', () => {
  let controller: WorkoutExerciseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutExerciseController],
      providers: [WorkoutExerciseService, WorkoutExerciseRepository],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<WorkoutExerciseController>(
      WorkoutExerciseController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
