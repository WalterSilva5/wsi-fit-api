import { BaseController } from 'src/modules/base/base.controller';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { ApiOkResponsePaginated } from 'src/interfaces/IPaginated';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Query,
  Res
} from '@nestjs/common';
import { AuthenticatedUser } from 'src/decorators/authenticated-user.decorator';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { ApikeyService } from './apikey.service';
import { ApikeyDto } from './dto/apikey.dto';
import { ApikeyUpdateDto } from './dto/apikey-update.dto';
import { UserDto } from '../user/dto/user.dto';
import { Response } from 'express';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('apikey')
@ApiTags('apikey')
@ApiBearerAuth()
export class ApikeyController extends BaseController<ApikeyDto> {
  constructor(protected service: ApikeyService) {
    super(service);
  }

  @Get()
  @ApiOkResponsePaginated(ApikeyDto)
  @Roles(Role.ADMIN)
  protected async getFilteredAsync(
    @AuthenticatedUser() user: UserDto,
    @Query() filter: DefaultFilter
  ): Promise<any> {
    return this.service.findFilteredAsync(filter, user);
  }

  @Get('/:id')
  @ApiOkResponse({ type: ApikeyDto })
  @Roles(Role.ADMIN)
  protected async findByIdAsync(
    @AuthenticatedUser() user: UserDto,
    @Param('id', ParseIntPipe) id: number
  ): Promise<any> {
    return this.service.findByIdAsync(id, user);
  }

  @Post()
  @ApiCreatedResponse({ type: ApikeyDto })
  @Roles(Role.ADMIN)
  protected async createAsync(
    @AuthenticatedUser() user: UserDto,
    @Body() dto: ApikeyDto
  ): Promise<any> {
    return this.service.createAsync(dto, user);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: ApikeyDto })
  @Roles(Role.ADMIN)
  protected async updateAsync(
    @AuthenticatedUser() user: UserDto,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ApikeyUpdateDto
  ): Promise<any> {
    return this.service.updateWithoutkeyAsync(id, dto);
  }

  @Delete('/:id')
  @ApiNoContentResponse({ type: undefined })
  @Roles(Role.ADMIN)
  protected async deleteAsync(
    @Res({ passthrough: true }) response: Response,
    @AuthenticatedUser() _user: UserDto,
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    response.status(204);
    return this.service.deleteAsync(id);
  }
}
