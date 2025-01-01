import { ApiResponseProperty } from '@nestjs/swagger';

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class WorkoutDTO {
  @ApiResponseProperty()
  id?: number;

  @ApiProperty({ required: true, default: 'Workout' })
  @IsString()
  name: string;

  @ApiProperty({
    required: false,
    default: 'Description of the workout',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: true, default: 1 })
  @IsNumber()
  userId: number;

  @ApiResponseProperty()
  createdAt?: Date;

  @ApiResponseProperty()
  updatedAt?: Date | null;

  @ApiResponseProperty()
  deletedAt?: Date | null;
}
