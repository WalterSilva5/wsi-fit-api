import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutService } from './workout.service';
import { WorkoutRepository } from './workout.repository';
import { PrismaModule } from 'src/database/prisma/prisma.module';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutService, WorkoutRepository],
      imports: [PrismaModule],
    }).compile();

    service = module.get<WorkoutService>(WorkoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
