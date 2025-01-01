import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class MuscleGroupDTO {
  @ApiResponseProperty()
  id?: number;

  @ApiProperty({ required: true, default: 'Biceps' })
  @IsString()
  @Length(3, 255)
  name: string;

  @ApiProperty({ required: false, default: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsString()
  @Length(3, 255)
  imageUrl?: string;
}
