/* eslint-disable @typescript-eslint/no-unused-vars */
import { CrudRepository as ICrudRepository } from 'src/interfaces/crud-repository.interface';
import { PaginationFilter } from 'src/filters/pagination.filter';
import { NotImplementedException } from '@nestjs/common';
import { Paginated } from 'src/interfaces/paginated.interface';
import { UserDto } from '../user/dto/user.dto';
import { PrismaService } from '../../database/prisma/prisma.service';

export abstract class CrudRepository<Dto = any, Entity = any>
  implements ICrudRepository<Dto, Entity>
{
  constructor(protected prisma: PrismaService) {}
  async findPaginated(
    filter: PaginationFilter,
    user?: UserDto,
  ): Promise<Paginated<Entity>> {
    throw new NotImplementedException();
  }
  async update(id: number, dto: Dto, user?: UserDto): Promise<Entity> {
    throw new NotImplementedException();
  }
  async findById(id: number, user?: UserDto): Promise<Entity> {
    throw new NotImplementedException();
  }
  async delete(id: number, user?: UserDto): Promise<void> {
    throw new NotImplementedException();
  }
  async create(dto: any, user?: UserDto): Promise<Entity> {
    throw new NotImplementedException();
  }
}
