import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseService } from './exercise.service';
import { ExerciseRepository } from './exercise.repository';
import { PrismaModule } from '../../database/prisma/prisma.module';

describe('ExerciseService', () => {
  let service: ExerciseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseService, ExerciseRepository],
      imports: [PrismaModule],
    }).compile();

    service = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
