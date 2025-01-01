import { Injectable } from '@nestjs/common';
import { CrudRepository } from '../base-crud/crud.repository';
import { Exercise } from '@prisma/client';
import { ExerciseDTO } from './dto/exercise.dto';
import { UserDto } from '../user/dto/user.dto';
import { PrismaService } from '../../database/prisma/prisma.service';
import { PaginationFilter } from 'src/filters/pagination.filter';
import { Paginated } from 'src/interfaces/paginated.interface';
import { Paginator } from 'src/utils/paginator';

@Injectable()
export class ExerciseRepository extends CrudRepository<ExerciseDTO, Exercise> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  async create(dto: ExerciseDTO, _user?: UserDto): Promise<Exercise> {
    return await this.prisma.exercise.create({
      data: {
        name: dto.name,
        imageUrl: dto.imageUrl,
        videoUrl: dto.videoUrl,
        description: dto.description,
        muscleGroup: dto.muscleGroupId
          ? { connect: { id: dto.muscleGroupId } }
          : dto.muscleGroup
          ? { create: dto.muscleGroup }
          : undefined,
      },
    });
  }

  async update(id: number, dto: ExerciseDTO): Promise<Exercise> {
    return await this.prisma.exercise.update({
      where: { id },
      data: {
        name: dto.name,
        imageUrl: dto.imageUrl,
        videoUrl: dto.videoUrl,
        description: dto.description,
        muscleGroupId: dto.muscleGroupId,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.exercise.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findById(id: number, _user?: UserDto): Promise<Exercise> {
    return await this.prisma.exercise.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findPaginated(
    filter: PaginationFilter,
    _user?: UserDto,
  ): Promise<Paginated<Exercise>> {
    const OR: Record<string, any>[] = [];

    if (filter?.search) {
      ['name', 'description'].map((field) => {
        OR.push({
          [field]: {
            contains: filter.search,
          },
        });
      });
    }

    return await Paginator.applyPagination(this.prisma.exercise, {
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
