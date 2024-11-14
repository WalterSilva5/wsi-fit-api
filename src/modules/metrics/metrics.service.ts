import { Injectable } from '@nestjs/common';
import { EventsGateway } from 'src/modules/gateway/events.gateway';
import { UserActivityRegistry } from 'src/modules/user/user.registry';
@Injectable()
export class MetricsService {
  constructor(
    protected readonly eventsGateway: EventsGateway,
    protected readonly userActivityRegistry: UserActivityRegistry
  ) {}

  async getMetrics(): Promise<string> {
    let metricsOutput = '';
    metricsOutput += this.getMetricsForActiveSessions();
    metricsOutput += this.getMetricsForActiveUsers();
    return metricsOutput;
  }

  private getMetricsForActiveSessions(): string {
    const sessionsCount = this.eventsGateway.activeSessions;
    return (
      [
        '# HELP active_sessions Número de sessões ativas.',
        '# TYPE active_sessions gauge',
        `active_sessions ${sessionsCount}`
      ].join('\n') + '\n'
    );
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
