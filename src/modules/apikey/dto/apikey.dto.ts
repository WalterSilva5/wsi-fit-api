import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ApikeyDto {
  @ApiResponseProperty()
  id?: number;

  @ApiProperty()
  @IsString({ message: 'Uma string era esperada' })
  @IsNotEmpty({ message: 'Este item é obrigatório' })
  service: string;

  @ApiProperty()
  @IsString({ message: 'Uma string era esperada' })
  @IsNotEmpty({ message: 'Este item é obrigatório' })
  key: string;

  @ApiProperty()
  @IsString({ message: 'Uma string era esperada' })
  @IsNotEmpty({ message: 'Este item é obrigatório' })
  expiresAt: string;

  @ApiProperty()
  @IsBoolean({ message: 'Um booleano era esperado' })
  @IsNotEmpty({ message: 'Este item é obrigatório' })
  isIndefinite: boolean;

  @ApiResponseProperty()
  createdBy?: number;

  @ApiResponseProperty()
  createdAt?: string;

  @ApiResponseProperty()
  updatedAt?: string;

  @ApiResponseProperty()
  deletedAt?: string;
}
