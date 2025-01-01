import { ApiResponseProperty } from '@nestjs/swagger';
import * as swagger from '@nestjs/swagger';
import * as classValidator from 'class-validator';

export class WorkoutExerciseDTO {
  @ApiResponseProperty()
  id?: number;

  @swagger.ApiProperty()
  @classValidator.IsNumber()
  @classValidator.IsNotEmpty()
  workoutId: number;

  @swagger.ApiProperty()
  @classValidator.IsNumber()
  @classValidator.IsNotEmpty()
  exerciseId: number;

  @ApiResponseProperty()
  createdAt?: Date;

  @ApiResponseProperty()
  updatedAt?: Date | null;

  @ApiResponseProperty()
  deletedAt?: Date | null;
}
