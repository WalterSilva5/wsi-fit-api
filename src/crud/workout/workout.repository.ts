import { Injectable } from '@nestjs/common';
import { CrudRepository } from 'src/crud/base-crud/crud.repository';
import { Workout } from '@prisma/client';
import { WorkoutDTO } from './workout.dto';
import { UserDto } from 'src/crud/user/dto/user.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { PaginationFilter } from 'src/filters/pagination.filter';
import { Paginated } from 'src/interfaces/paginated.interface';
import { Paginator } from 'src/utils/paginator';

@Injectable()
export class WorkoutRepository extends CrudRepository<WorkoutDTO, Workout> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  async create(dto: WorkoutDTO, _user?: UserDto): Promise<Workout> {
    return await this.prisma.workout.create({
      data: {
        name: dto.name,
        description: dto.description,
        userId: dto.userId,
      },
    });
  }

  async update(id: number, dto: WorkoutDTO): Promise<Workout> {
    return await this.prisma.workout.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        userId: dto.userId,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.workout.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findById(id: number, _user?: UserDto): Promise<Workout> {
    return await this.prisma.workout.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findPaginated(
    filter: PaginationFilter,
    _user?: UserDto,
  ): Promise<Paginated<Workout>> {
    const OR: Record<string, any>[] = [];

    if (filter?.search) {
      ['name'].map((field) => {
        OR.push({
          [field]: {
            contains: filter.search,
          },
        });
      });
    }

    return await Paginator.applyPagination(this.prisma.workout, {
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
