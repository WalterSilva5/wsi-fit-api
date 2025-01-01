import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { ExerciseRepository } from './exercise.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ExerciseController],
  providers: [ExerciseService, ExerciseRepository],
})
export class ExerciseModule {}
