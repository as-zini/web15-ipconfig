import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceGateway } from './workspace.gateway';

@Module({
  providers: [WorkspaceService, WorkspaceGateway],
})
export class WorkspaceModule {}
