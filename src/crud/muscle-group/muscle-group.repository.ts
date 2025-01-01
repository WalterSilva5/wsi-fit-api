import { Injectable } from '@nestjs/common';
import { CrudRepository } from '../base-crud/crud.repository';
import { MuscleGroup } from '@prisma/client';
import { MuscleGroupDTO } from './dto/muscle-group.dto';
import { UserDto } from '../user/dto/user.dto';
import { PrismaService } from '../../database/prisma/prisma.service';
import { PaginationFilter } from 'src/filters/pagination.filter';
import { Paginated } from 'src/interfaces/paginated.interface';
import { Paginator } from 'src/utils/paginator';

@Injectable()
export class MuscleGroupRepository extends CrudRepository<
  MuscleGroupDTO,
  MuscleGroup
> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }
  async create(dto: MuscleGroupDTO, _user?: UserDto): Promise<MuscleGroup> {
    return await this.prisma.muscleGroup.create({
      data: {
        name: dto.name,
        imageUrl: dto.imageUrl,
      },
    });
  }

  async update(id: number, dto: MuscleGroupDTO): Promise<MuscleGroup> {
    return await this.prisma.muscleGroup.update({
      where: { id },
      data: {
        name: dto.name,
        imageUrl: dto.imageUrl,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.muscleGroup.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findById(id: number, _user?: UserDto): Promise<MuscleGroup> {
    return await this.prisma.muscleGroup.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findPaginated(
    filter: PaginationFilter,
    _user?: UserDto,
  ): Promise<Paginated<MuscleGroup>> {
    const OR: Record<string, any>[] = [];

    if (filter?.search) {
      ['name', 'imageUrl'].map((field) => {
        OR.push({
          [field]: {
            contains: filter.search,
          },
        });
      });
    }

    return await Paginator.applyPagination(this.prisma.muscleGroup, {
      ...filter,
      where: {
        deletedAt: null,
        AND: {
          OR,
        },
      },
    });
  }

  async findByIdWithoutUser(id: number): Promise<MuscleGroup> {
    return await this.prisma.muscleGroup.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
