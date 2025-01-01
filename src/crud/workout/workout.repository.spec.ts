import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutRepository } from './workout.repository';
import { PrismaService } from 'src/database/prisma/prisma.service';

describe('WorkoutRepository', () => {
  let repository: WorkoutRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutRepository,
        {
          provide: PrismaService,
          useValue: {
            workout: {
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

    repository = module.get<WorkoutRepository>(WorkoutRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
