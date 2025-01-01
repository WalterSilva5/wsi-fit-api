import { Test, TestingModule } from '@nestjs/testing';
import { MuscleGroupRepository } from './muscle-group.repository';

describe('MuscleGroupRepository', () => {
  let service: MuscleGroupRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MuscleGroupRepository],
    }).compile();

    service = module.get<MuscleGroupRepository>(MuscleGroupRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
