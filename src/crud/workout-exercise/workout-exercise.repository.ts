import { Injectable } from '@nestjs/common';
import { WorkoutExercise } from '@prisma/client';
import { WorkoutExerciseDTO } from './workout-exercise.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class WorkoutExerciseRepository {
  constructor(protected prisma: PrismaService) {}

  async create(dto: WorkoutExerciseDTO): Promise<WorkoutExercise> {
    return await this.prisma.workoutExercise.create({
      data: {
        exerciseId: dto.exerciseId,
        workoutId: dto.workoutId,
      },
    });
  }

  async getByWorkoutId(workoutId: number): Promise<WorkoutExercise[]> {
    return await this.prisma.workoutExercise.findMany({
      where: {
        workoutId,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.workoutExercise.delete({
      where: {
        id,
      },
    });
  }

  async deleteAllByWorkoutId(workoutId: number): Promise<void> {
    await this.prisma.workoutExercise.deleteMany({
      where: {
        workoutId,
      },
    });
  }
}
