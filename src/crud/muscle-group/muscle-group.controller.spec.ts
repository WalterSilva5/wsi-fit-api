import { Test, TestingModule } from '@nestjs/testing';
import { MuscleGroupController } from './muscle-group.controller';

describe('MuscleGroupController', () => {
  let controller: MuscleGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MuscleGroupController],
    }).compile();

    controller = module.get<MuscleGroupController>(MuscleGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
