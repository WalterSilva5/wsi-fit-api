import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutExerciseService } from './workout-exercise.service';
import { WorkoutExerciseRepository } from './workout-exercise.repository';
import { PrismaModule } from 'src/database/prisma/prisma.module';

describe('WorkoutExerciseService', () => {
  let service: WorkoutExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutExerciseService, WorkoutExerciseRepository],
      imports: [PrismaModule],
    }).compile();

    service = module.get<WorkoutExerciseService>(WorkoutExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
