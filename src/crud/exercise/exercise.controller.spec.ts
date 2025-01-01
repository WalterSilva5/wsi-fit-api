import { Test, TestingModule } from '@nestjs/testing';
import { MuscleGroupController } from './exercise.controller';
import { MuscleGroupRepository } from './exercise.repository';
import { MuscleGroupService } from './exercise.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';

describe('MuscleGroupController', () => {
  let controller: MuscleGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MuscleGroupController],
      providers: [MuscleGroupService, MuscleGroupRepository],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<MuscleGroupController>(MuscleGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
