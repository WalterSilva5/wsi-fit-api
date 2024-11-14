import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ApikeyService } from 'src/modules/apikey/apikey.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
    preflightContinue: false
  }
})
@Injectable()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('EventsGateway');
  public activeSessions = 0;
  private activeUserlist = [];

  constructor(private apikeyService: ApikeyService) {}

  @WebSocketServer()
  private server: Server;

  afterInit(_: Server) {
    this.logger.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    this.validateApiKey(client);
    this.logger.log(`Client connected: ${client.id}`);
    if (!this.activeUserlist.includes(client.id)) {
      this.activeUserlist.push(client.id);
      this.activeSessions++;
    }
  }

  private async validateApiKey(client) {
    const apikey = client.handshake.headers.authorization;
    const apiKeyValid = await this.apikeyService.validateApiKey(apikey);
    if (!apiKeyValid || !apikey) {
      this.logger.error(`INVALID APIKEY`);
      client.emit('error', 'INVALID APIKEY');
      client.disconnect(true);
    }
    this.logger.log(`APIKEY VALID - USER CONNECTED`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
    if (this.activeUserlist.includes(client.id)) {
      this.activeUserlist = this.activeUserlist.filter((user) => user !== client.id);
      this.activeSessions = Math.max(0, this.activeSessions - 1);
    }
  }
}
