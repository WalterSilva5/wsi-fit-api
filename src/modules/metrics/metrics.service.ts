import { Injectable } from '@nestjs/common';
import { UserActivityRegistry } from 'src/modules/user/user.registry';
@Injectable()
export class MetricsService {
  constructor(
    protected readonly userActivityRegistry: UserActivityRegistry
  ) {}

  async getMetrics(): Promise<string> {
    let metricsOutput = '';
    metricsOutput += this.getMetricsForActiveUsers();
    return metricsOutput;
  }

  private getMetricsForActiveUsers(): string {
    this.userActivityRegistry.pruneInactiveUsers();
    const activeUsersCount = this.userActivityRegistry.userLastActivity.size;

    return (
      [
        '# HELP active_users Número de usuários ativos.',
        '# TYPE active_users gauge',
        `active_users ${activeUsersCount}`
      ].join('\n') + '\n'
    );
  }
}
