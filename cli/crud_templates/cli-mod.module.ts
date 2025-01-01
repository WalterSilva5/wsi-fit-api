import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { ExerciseService } from './cli-mod.service';
import { ExerciseController } from './cli-mod.controller';
import { ExerciseRepository } from './cli-mod.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ExerciseController],
  providers: [ExerciseService, ExerciseRepository],
})
export class ExerciseModule {}
