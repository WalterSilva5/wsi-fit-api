import { Test, TestingModule } from '@nestjs/testing';
import { CliModService } from './cli-mod.service';
import { CliModRepository } from './cli-mod.repository';
import { PrismaModule } from 'src/database/prisma/prisma.module';

describe('CliModService', () => {
  let service: CliModService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CliModService, CliModRepository],
      imports: [PrismaModule],
    }).compile();

    service = module.get<CliModService>(CliModService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
