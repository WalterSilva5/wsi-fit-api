import { Test, TestingModule } from '@nestjs/testing';
import { CliModRepository } from './cli-mod.repository';
import { PrismaService } from 'src/database/prisma/prisma.service';

describe('CliModRepository', () => {
  let repository: CliModRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CliModRepository,
        {
          provide: PrismaService,
          useValue: {
            cliModEntity: {
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

    repository = module.get<CliModRepository>(CliModRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
