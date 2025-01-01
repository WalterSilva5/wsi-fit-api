import { Injectable } from '@nestjs/common';
import { CrudRepository } from 'src/crud/base-crud/crud.repository';
import { CliMod } from '@prisma/client';
import { CliModDTO } from './cli-mod.dto';
import { UserDto } from 'src/crud/user/dto/user.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { PaginationFilter } from 'src/filters/pagination.filter';
import { Paginated } from 'src/interfaces/paginated.interface';
import { Paginator } from 'src/utils/paginator';

@Injectable()
export class CliModRepository extends CrudRepository<CliModDTO, CliMod> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  async create(dto: CliModDTO, _user?: UserDto): Promise<CliMod> {
    return await this.prisma.cliModEntity.create({
      data: {
        //TODO: fill in the data object
      },
    });
  }

  async update(id: number, dto: CliModDTO): Promise<CliMod> {
    return await this.prisma.cliModEntity.update({
      where: { id },
      data: {
        //TODO: fill in the data object
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.cliModEntity.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findById(id: number, _user?: UserDto): Promise<CliMod> {
    return await this.prisma.cliModEntity.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findPaginated(
    filter: PaginationFilter,
    _user?: UserDto,
  ): Promise<Paginated<CliMod>> {
    const OR: Record<string, any>[] = [];

    if (filter?.search) {
      //TODO: fill in the search logic
      ['fieldNamesForSearch'].map((field) => {
        OR.push({
          [field]: {
            contains: filter.search,
          },
        });
      });
    }

    return await Paginator.applyPagination(this.prisma.cliModEntity, {
      ...filter,
      where: {
        deletedAt: null,
        AND: {
          OR,
        },
      },
    });
  }
}
