import { PrismaService } from 'src/database/prisma/prisma.service';
import { BaseRepository } from 'src/modules/base/base.repository';
import { DefaultFilter } from 'src/filters/DefaultFilter';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { Paginated } from 'src/interfaces/IPaginated';
import { ApikeyDto } from './dto/apikey.dto';
import { Paginator } from 'src/utils/paginator';
import { Injectable } from '@nestjs/common';
import { Apikey } from '@prisma/client';
import { ApikeyUpdateDto } from './dto/apikey-update.dto';

@Injectable()
export class ApikeyRepository extends BaseRepository<ApikeyDto, Apikey> {
  constructor(private prisma: PrismaService) {
    super();
  }

  async createAsync(dto: ApikeyDto, user?: UserDto): Promise<Apikey> {
    return await this.prisma.apikey.create({
      data: {
        service: dto.service,
        key: dto.key,
        createdBy: user.id,
        expiresAt: dto.expiresAt
      }
    });
  }

  async updateAsync(id: number, dto: ApikeyDto): Promise<Apikey> {
    return await this.prisma.apikey.update({
      where: { id },
      data: {
        service: dto.service,
        key: dto.key,
        expiresAt: dto.expiresAt
      }
    });
  }

  async updateWithoutkeyAsync(id: number, dto: ApikeyUpdateDto): Promise<Apikey> {
    return await this.prisma.apikey.update({
      where: { id },
      data: {
        service: dto.service,
        expiresAt: dto.expiresAt,
        isIndefinite: dto.isIndefinite
      }
    });
  }

  async deleteAsync(id: number): Promise<void> {
    await this.prisma.apikey.delete({
      where: { id: id }
    });
  }

  async findByIdAsync(id: number): Promise<Apikey> {
    return await this.prisma.apikey.findFirst({
      where: { id }
    });
  }

  async findFilteredAsync(filter: DefaultFilter): Promise<Paginated<Apikey>> {
    const OR: Record<string, any>[] = [];

    if (filter?.search) {
      ['service'].map((field) => {
        OR.push({
          [field]: {
            contains: filter.search
          }
        });
      });
    }

    return await Paginator.applyPagination(this.prisma.apikey, {
      ...filter,
      where: {
        deletedAt: null,
        AND: {
          OR
        }
      }
    });
  }

  async findByKey(key: string): Promise<Apikey | null> {
    if (!key) {
      return null;
    }
    return await this.prisma.apikey.findFirst({
      where: { key }
    });
  }
}
