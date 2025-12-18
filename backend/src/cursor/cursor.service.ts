import { Injectable } from '@nestjs/common';
import { SetCursorDTO } from './dto/set-cursor.dto';
import { UpdateCursorDTO } from './dto/update-cursor.dto';

export interface CursorState {
  userId: string;
  workspaceId: string;
  x: number;
  y: number;
}

@Injectable()
export class CursorService {
  private readonly cursorsByWorkspace = new Map<
    string,
    Map<string, CursorState>
  >();
  setCursor(dto: SetCursorDTO) {
    const { workspaceId, userId, x, y } = dto;

    let map = this.cursorsByWorkspace.get(workspaceId);
    if (!map) {
      map = new Map();
      this.cursorsByWorkspace.set(workspaceId, map);
    }

    if (map.has(userId)) {
      return;
    }

    map.set(userId, { userId, workspaceId, x, y });
  }

  updateCursor(dto: UpdateCursorDTO) {
    const { workspaceId, userId, x, y } = dto;

    const map = this.cursorsByWorkspace.get(workspaceId);
    if (!map) {
      return;
    }

    const prev = map.get(userId);
    if (!prev) {
      return;
    }

    map.set(userId, {
      ...prev,
      x: x ?? prev.x,
      y: y ?? prev.y,
    });
  }

  hasCursor(workspaceId: string, userId: string): boolean {
    return this.cursorsByWorkspace.get(workspaceId)?.has(userId) ?? false;
  }

  removeCursor(workspaceId: string, userId: string) {
    this.cursorsByWorkspace.get(workspaceId)?.delete(userId);
  }

  getCursorsByWorkspace(workspaceId: string): CursorState[] {
    return Array.from(this.cursorsByWorkspace.get(workspaceId)?.values() ?? []);
  }

  clearWorkspace(workspaceId: string) {
    this.cursorsByWorkspace.delete(workspaceId);
  }
}
