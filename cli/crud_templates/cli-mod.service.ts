import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/crud/base-crud/crud.service';
import { cliModEntity } from '@prisma/client';
import { CliModDTO } from './cli-mod.dto';
import { CliModRepository } from './cli-mod.repository';

@Injectable()
export class CliModService extends CrudService<CliModDTO, cliModEntity> {
  constructor(protected repository: CliModRepository) {
    super(repository);
  }
}
