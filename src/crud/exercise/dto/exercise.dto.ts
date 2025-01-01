import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Length,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class MuscleGroupInput {
  @ApiProperty({ required: true, default: 'Chest' })
  @IsString()
  @Length(3, 255)
  name: string;

  @ApiProperty({ required: true, default: 'https://example.com/image.jpg' })
  @IsString()
  @Length(3, 255)
  imageUrl: string;
}

export class ExerciseDTO {
  @ApiResponseProperty()
  id?: number;

  @ApiProperty({ required: true, default: 'Biceps' })
  @IsString()
  @Length(3, 255)
  name: string;

  @ApiProperty({ required: false, default: 'https://example.com/video.mp4' })
  @IsOptional()
  @IsString()
  @Length(3, 255)
  videoUrl?: string;

  @ApiProperty({ required: false, default: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsString()
  @Length(3, 255)
  imageUrl?: string;

  @ApiProperty({ required: false, default: 'Description of the exercise' })
  @IsOptional()
  @IsString()
  @Length(3, 255)
  description?: string;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsNumber()
  muscleGroupId?: number;

  @ApiProperty({ required: false, type: MuscleGroupInput })
  @IsOptional()
  @ValidateNested()
  @Type(() => MuscleGroupInput)
  muscleGroup?: MuscleGroupInput;

  @ApiResponseProperty()
  createdAt?: Date;

  @ApiResponseProperty()
  updatedAt?: Date | null;

  @ApiResponseProperty()
  deletedAt?: Date | null;
}
