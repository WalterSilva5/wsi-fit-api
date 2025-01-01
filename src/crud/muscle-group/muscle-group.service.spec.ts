import { Test, TestingModule } from '@nestjs/testing';
import { MuscleGroupService } from './muscle-group.service';
import { MuscleGroupRepository } from './muscle-group.repository';
import { PrismaModule } from '../../database/prisma/prisma.module';

describe('MuscleGroupService', () => {
  let service: MuscleGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MuscleGroupService, MuscleGroupRepository],
      imports: [PrismaModule],
    }).compile();

    service = module.get<MuscleGroupService>(MuscleGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
