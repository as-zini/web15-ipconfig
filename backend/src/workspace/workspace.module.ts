import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceGateway } from './workspace.gateway';
import { CursorModule } from '../cursor/cursor.module';

@Module({
  imports: [CursorModule],
  providers: [WorkspaceService, WorkspaceGateway],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
