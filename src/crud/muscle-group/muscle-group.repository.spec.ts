import { Test, TestingModule } from '@nestjs/testing';
import { MuscleGroupRepository } from './muscle-group.repository';
import { PrismaService } from '../../database/prisma/prisma.service';

describe('MuscleGroupRepository', () => {
  let repository: MuscleGroupRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MuscleGroupRepository,
        {
          provide: PrismaService,
          useValue: {
            muscleGroup: {
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

    repository = module.get<MuscleGroupRepository>(MuscleGroupRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
