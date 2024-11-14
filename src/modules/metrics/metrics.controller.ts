import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Res } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { IsPublic } from 'src/decorators/is-public.decorator';
import { Response } from 'express';

@Controller('metrics')
@ApiTags('metrics')
@ApiBearerAuth()
export class MetricsController {
  constructor(protected service: MetricsService) {}

  @Get()
  @IsPublic()
  protected async getMetrics(@Res() res: Response): Promise<void> {
    const metrics = await this.service.getMetrics();

    res.setHeader('Content-Type', 'text/plain');
    res.send(metrics);
  }
}
