import { Body, Controller, Post } from '@nestjs/common';
import { CrudController } from 'src/crud/base-crud/crud.controller';
import { WorkoutDTO } from './workout.dto';
import { WorkoutService } from './workout.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser } from 'src/crud/auth/decorators/authenticated-user.decorator';

@Controller('workout')
@ApiTags('workout')
export class WorkoutController extends CrudController<WorkoutDTO> {
  constructor(protected readonly service: WorkoutService) {
    super(service);
  }

  @Post()
  @ApiOkResponse({ type: WorkoutDTO })
  async create(
    @AuthenticatedUser() user: any,
    @Body() dto: WorkoutDTO,
  ): Promise<WorkoutDTO> {
    return this.service.create(dto, user);
  }
}
