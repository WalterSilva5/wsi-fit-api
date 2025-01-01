import { Body, Controller, Post } from '@nestjs/common';
import { CrudController } from 'src/crud/base-crud/crud.controller';
import { CliModDTO } from './cli-mod.dto';
import { CliModService } from './cli-mod.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser } from 'src/crud/auth/decorators/authenticated-user.decorator';

@Controller('cli-mod')
@ApiTags('cli-mod')
export class CliModController extends CrudController<CliModDTO> {
  constructor(protected readonly service: CliModService) {
    super(service);
  }

  @Post()
  @ApiOkResponse({ type: CliModDTO })
  async create(
    @AuthenticatedUser() user: any,
    @Body() dto: CliModDTO,
  ): Promise<CliModDTO> {
    return this.service.create(dto, user);
  }
}
