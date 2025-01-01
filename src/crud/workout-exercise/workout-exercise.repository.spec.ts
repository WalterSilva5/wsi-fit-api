import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutExerciseRepository } from './workout-exercise.repository';
import { PrismaService } from 'src/database/prisma/prisma.service';

describe('WorkoutExerciseRepository', () => {
  let repository: WorkoutExerciseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutExerciseRepository,
        {
          provide: PrismaService,
          useValue: {
            WorkoutExercise: {
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              findFirst: jest.fn(),
              findMany: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<WorkoutExerciseRepository>(
      WorkoutExerciseRepository,
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
