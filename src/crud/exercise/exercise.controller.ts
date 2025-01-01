import { Body, Controller, Post } from '@nestjs/common';
import { CrudController } from '../base-crud/crud.controller';
import { ExerciseDTO } from './dto/exercise.dto';
import { ExerciseService } from './exercise.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser } from 'src/crud/auth/decorators/authenticated-user.decorator';

@Controller('exercise')
@ApiTags('exercise')
export class ExerciseController extends CrudController<ExerciseDTO> {
  constructor(protected readonly service: ExerciseService) {
    super(service);
  }

  @Post()
  @ApiOkResponse({ type: ExerciseDTO })
  async create(
    @AuthenticatedUser() user: any,
    @Body() dto: ExerciseDTO,
  ): Promise<ExerciseDTO> {
    return this.service.create(dto, user);
  }
}
