import {
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res
} from '@nestjs/common';
import { AuthenticatedUser } from 'src/decorators/authenticated-user.decorator';
import { IBaseService } from 'src/interfaces/IBaseService';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserDto } from '../user/dto/user.dto';
import { Response } from 'express';
import { Paginated } from 'src/interfaces/IPaginated';

@ApiBearerAuth()
export class BaseController<Dto = any> {
  constructor(protected service: IBaseService<Dto>) {}

  @Get()
  protected async getFilteredAsync(
    @AuthenticatedUser() user: UserDto,
    @Query() filter: DefaultFilter
  ): Promise<Paginated<Dto>> {
    return this.service.findFilteredAsync(filter, user);
  }

  @Get('/:id')
  protected async findByIdAsync(
    @AuthenticatedUser() user: UserDto,
    @Param('id', ParseIntPipe) id: number
  ): Promise<any> {
    return this.service.findByIdAsync(id, user);
  }

  @Post()
  protected async createAsync(
    @AuthenticatedUser() user: UserDto,
    @Body() dto: Dto
  ): Promise<any> {
    return this.service.createAsync(dto, user);
  }

  @Put('/:id')
  protected async updateAsync(
    @AuthenticatedUser() user: UserDto,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Dto
  ): Promise<any> {
    return this.service.updateAsync(id, dto, user);
  }

  @Delete('/:id')
  protected async deleteAsync(
    @Res({ passthrough: true }) response: Response,
    @AuthenticatedUser() user: UserDto,
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    response.status(204);
    return this.service.deleteAsync(id, user);
  }
}
