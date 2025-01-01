import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseRepository } from './exercise.repository';
import { PrismaService } from '../../database/prisma/prisma.service';

describe('ExerciseRepository', () => {
  let repository: ExerciseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExerciseRepository,
        {
          provide: PrismaService,
          useValue: {
            exercise: {
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

    repository = module.get<ExerciseRepository>(ExerciseRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
