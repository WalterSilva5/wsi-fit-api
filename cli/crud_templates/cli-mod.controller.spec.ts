import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { CliModController } from './cli-mod.controller';
import { CliModRepository } from './cli-mod.repository';
import { CliModService } from './cli-mod.service';

describe('CliModController', () => {
  let controller: CliModController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CliModController],
      providers: [CliModService, CliModRepository],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<CliModController>(CliModController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
