import { Injectable } from '@nestjs/common';
import { CrudService } from '../base-crud/crud.service';
import { MuscleGroup } from '@prisma/client';
import { MuscleGroupDTO } from './dto/muscle-group.dto';
import { MuscleGroupRepository } from './muscle-group.repository';

@Injectable()
export class MuscleGroupService extends CrudService<
  MuscleGroupDTO,
  MuscleGroup
> {
  constructor(protected repository: MuscleGroupRepository) {
    super(repository);
  }
}
