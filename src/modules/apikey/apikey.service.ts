import { PrismaService } from 'src/database/prisma/prisma.service';
import { BaseService } from 'src/modules/base/base.service';
import { ApikeyRepository } from './apikey.repository';
import { ApikeyDto } from './dto/apikey.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Apikey } from '@prisma/client';
import { Logger } from '@nestjs/common';
import { ApikeyUpdateDto } from './dto/apikey-update.dto';

@Injectable()
export class ApikeyService extends BaseService<ApikeyDto, Apikey> {
  private readonly logger = new Logger(ApikeyService.name);
  constructor(
    protected readonly repository: ApikeyRepository,
    protected readonly prisma: PrismaService
  ) {
    super(repository);
  }

  async validateApiKey(apikey: string): Promise<boolean> {
    const apikeyFound = await this.repository.findByKey(apikey);
    if (!apikeyFound) return false;
    if (apikeyFound.isIndefinite) return true;
    if (apikeyFound.expiresAt < new Date()) return false;
    return true;
  }
  async updateWithoutkeyAsync(id: number, dto: ApikeyUpdateDto): Promise<Apikey> {
    const apikey = await this.repository.findByIdAsync(id);
    if (!apikey) throw new NotFoundException();
    const updated = await this.repository.updateWithoutkeyAsync(id, dto);
    return updated;
  }
}
