import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { WorkoutController } from './workout.controller';
import { WorkoutRepository } from './workout.repository';
import { WorkoutService } from './workout.service';

describe('WorkoutController', () => {
  let controller: WorkoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutController],
      providers: [WorkoutService, WorkoutRepository],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<WorkoutController>(WorkoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
