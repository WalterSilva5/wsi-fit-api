import { Body, Controller, Post } from '@nestjs/common';
import { CrudController } from '../base-crud/crud.controller';
import { MuscleGroupDTO } from './dto/muscle-group.dto';
import { MuscleGroupService } from './muscle-group.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser } from 'src/crud/auth/decorators/authenticated-user.decorator';

@Controller('muscle-group')
@ApiTags('muscle-group')
export class MuscleGroupController extends CrudController<MuscleGroupDTO> {
  constructor(private readonly muscleGroupService: MuscleGroupService) {
    super(muscleGroupService);
  }

  @Post()
  @ApiOkResponse({ type: MuscleGroupDTO })
  async create(
    @AuthenticatedUser() user: any,
    @Body() dto: MuscleGroupDTO,
  ): Promise<MuscleGroupDTO> {
    return this.muscleGroupService.create(dto, user);
  }
}
