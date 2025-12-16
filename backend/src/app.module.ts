import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspaceGateway } from './workspace/workspace.gateway';
import { WorkspaceModule } from './workspace/workspace.module';
import { WidgetService } from './widget/widget.service';
import { WidgetModule } from './widget/widget.module';

@Module({
  imports: [WorkspaceModule, WidgetModule],
  controllers: [AppController],
  providers: [AppService, WorkspaceGateway, WidgetService],
})
export class AppModule {}
