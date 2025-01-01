import { Injectable } from '@nestjs/common';
import { CrudService } from '../base-crud/crud.service';
import { Exercise } from '@prisma/client';
import { ExerciseDTO } from './dto/exercise.dto';
import { ExerciseRepository } from './exercise.repository';

@Injectable()
export class ExerciseService extends CrudService<ExerciseDTO, Exercise> {
  constructor(protected repository: ExerciseRepository) {
    super(repository);
  }
}
