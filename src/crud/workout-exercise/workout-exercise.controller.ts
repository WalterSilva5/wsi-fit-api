import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { WorkoutExerciseDTO } from './workout-exercise.dto';
import { WorkoutExerciseService } from './workout-exercise.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser } from 'src/crud/auth/decorators/authenticated-user.decorator';

@Controller('workout-exercise')
@ApiTags('workout-exercise')
@ApiBearerAuth()
export class WorkoutExerciseController {
  constructor(protected readonly service: WorkoutExerciseService) {}

  @Post()
  @ApiOkResponse({ type: WorkoutExerciseDTO })
  async create(
    @AuthenticatedUser() user: any,
    @Body() dto: WorkoutExerciseDTO,
  ): Promise<WorkoutExerciseDTO> {
    return this.service.create(dto);
  }

  @Delete('')
  @ApiOkResponse()
  async delete(@Body() dto: WorkoutExerciseDTO): Promise<void> {
    return this.service.delete(dto.id);
  }

  @Delete('delete-all-by-workout')
  @ApiOkResponse()
  async deleteAllByWorkoutId(@Body() dto: WorkoutExerciseDTO): Promise<void> {
    return this.service.deleteAllByWorkoutId(dto.workoutId);
  }

  @Get('get-by-workout')
  @ApiOkResponse({ type: [WorkoutExerciseDTO] })
  async getByWorkoutId(
    @Query('workoutId') workoutId: number,
  ): Promise<WorkoutExerciseDTO[]> {
    return this.service.getByWorkoutId(workoutId);
  }
}
