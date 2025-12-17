import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { type IWidgetService, WIDGET_SERVICE } from './widget.interface';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';

@WebSocketGateway({ namespace: 'workspace', cors: { origin: '*' } })
export class WidgetGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(WIDGET_SERVICE)
    private readonly widgetService: IWidgetService,
  ) {}

  @SubscribeMessage('widget:create')
  async create(@MessageBody() createWidgetDto: CreateWidgetDto) {
    const widget = await this.widgetService.create(createWidgetDto);
    this.server.emit('widget:created', widget);
    return widget;
  }

  @SubscribeMessage('widget:update')
  async update(@MessageBody() updateWidgetDto: UpdateWidgetDto) {
    const updatedWidget = await this.widgetService.update(updateWidgetDto);
    this.server.emit('widget:updated', updatedWidget);
    return updatedWidget;
  }

  @SubscribeMessage('widget:delete')
  async remove(@MessageBody() body: { widgetId: string }) {
    const result = await this.widgetService.remove(body.widgetId);
    this.server.emit('widget:deleted', result);
    return result;
  }

  @SubscribeMessage('widget:load_all')
  async findAll(@ConnectedSocket() client: Socket) {
    const widgets = await this.widgetService.findAll();
    client.emit('widget:load_all_response', widgets);
  }
}
