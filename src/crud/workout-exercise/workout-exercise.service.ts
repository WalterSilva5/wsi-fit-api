import { Injectable } from '@nestjs/common';
import { WorkoutExercise } from '@prisma/client';
import { WorkoutExerciseDTO } from './workout-exercise.dto';
import { WorkoutExerciseRepository } from './workout-exercise.repository';

@Injectable()
export class WorkoutExerciseService {
  constructor(protected repository: WorkoutExerciseRepository) {}

  async create(dto: WorkoutExerciseDTO): Promise<WorkoutExercise> {
    return await this.repository.create(dto);
  }

  async getByWorkoutId(workoutId: number): Promise<WorkoutExercise[]> {
    return await this.repository.getByWorkoutId(workoutId);
  }

  async delete(id: number): Promise<void> {
    return await this.repository.delete(id);
  }

  async deleteAllByWorkoutId(workoutId: number): Promise<void> {
    return await this.repository.deleteAllByWorkoutId(workoutId);
  }
}
