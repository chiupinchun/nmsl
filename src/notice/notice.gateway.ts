import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: '/notice' })
export class NoticeGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private jwtService: JwtService) { }

  @WebSocketServer()
  wss: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized.');
  }
  async handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.auth.token;
    if (!token) {
      client.emit('error', { msg: '系統異常。', status: -1 });
      return;
    }

    try {
      const { id } = await this.jwtService.verifyAsync(
        token,
        { secret: process.env.JWT_SECRET }
      );
      if (id) {
        client.join(id);
      } else client.emit('error', { msg: '無效token', status: 0 });
    } catch {
      client.emit('error', { msg: '無效token', status: 0 });
    }
    return;
    // this.logger.log(`client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): WsResponse<string> {
    return { event: 'notice', data: '>wO' };
  }

  announce(payload: string): void {
    this.wss.emit('announce', 'test');
  }
}
