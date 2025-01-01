import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/crud/base-crud/crud.service';
import { Workout } from '@prisma/client';
import { WorkoutDTO } from './workout.dto';
import { WorkoutRepository } from './workout.repository';

@Injectable()
export class WorkoutService extends CrudService<WorkoutDTO, Workout> {
  constructor(protected repository: WorkoutRepository) {
    super(repository);
  }
}
