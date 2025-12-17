import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { WorkspaceService } from '../workspace.service';
import { JoinUserDTO } from '../dto/join-user.dto';
import { LeaveUserDTO } from '../dto/left-user.dto';
import { Socket } from 'socket.io';

describe('WorkspaceService', () => {
  let service: WorkspaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspaceService],
    }).compile();

    service = module.get<WorkspaceService>(WorkspaceService);
  });

  it('서비스 인스턴스 생성', () => {
    expect(service).toBeDefined();
  });

  describe('joinUser', () => {
    it('방이 없으면 생성하고 유저 추가', () => {
      // GIVEN
      const payload: JoinUserDTO = {
        projectId: 'p1',
        user: { id: 'u1', nickname: 'user1', color: '#000000' },
      };
      const client = { id: 's1' } as Socket;

      // WHEN
      const result = service.joinUser(payload, client);

      // THEN
      expect(result).toEqual({
        roomId: 'p1',
        user: payload.user,
      });

      // 내부 상태 확인: roomId가 생성되고, 유저가 들어있다
      expect(service['rooms'].get('p1')).toEqual([payload.user]);
    });

    it('같은 방에 여러 유저를 순차적으로 추가하기', () => {
      // GIVEN
      const payload1: JoinUserDTO = {
        projectId: 'p1',
        user: { id: 'u1', nickname: 'user1', color: '#000000' },
      };
      const payload2: JoinUserDTO = {
        projectId: 'p1',
        user: { id: 'u2', nickname: 'user2', color: '#111111' },
      };
      const client1 = { id: 's1' } as Socket;
      const client2 = { id: 's2' } as Socket;

      // WHEN
      const result1 = service.joinUser(payload1, client1);
      const result2 = service.joinUser(payload2, client2);

      // THEN
      expect(result1.roomId).toBe('p1');
      expect(result2.roomId).toBe('p1');
      expect(service['rooms'].get('p1')).toEqual([
        payload1.user,
        payload2.user,
      ]);
    });
  });

  describe('getRoomIdByUserId', () => {
    it('해당 유저가 속한 roomId를 반환한다', () => {
      // GIVEN
      const payload: JoinUserDTO = {
        projectId: 'p1',
        user: { id: 'u1', nickname: 'user1', color: '#000000' },
      };
      const client = { id: 's1' } as Socket;
      service.joinUser(payload, client);

      // WHEN
      const roomId = service.getRoomIdByUserId('u1');

      // THEN
      expect(roomId).toBe('p1');
    });

    it('유저가 없으면 NotFoundException을 던진다', () => {
      // GIVEN
      const payload: JoinUserDTO = {
        projectId: 'p1',
        user: { id: 'u1', nickname: 'user1', color: '#000000' },
      };
      const client = { id: 's1' } as Socket;
      service.joinUser(payload, client);

      // WHEN + THEN
      expect(() => service.getRoomIdByUserId('u-not-exist')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('leaveUser', () => {
    it('방에서 유저를 제거하고 roomId, userId를 반환한다', () => {
      // GIVEN
      const joinPayload: JoinUserDTO = {
        projectId: 'p1',
        user: { id: 'u1', nickname: 'user1', color: '#000000' },
      };
      const client = { id: 's1' } as Socket;
      service.joinUser(joinPayload, client);
      const leavePayload: LeaveUserDTO = { projectId: 'p1', userId: 'u1' };

      // WHEN
      const result = service.leaveUser(leavePayload, client);

      // THEN
      expect(result).toEqual({ roomId: 'p1', userId: 'u1' });
      expect(service['rooms'].has('p1')).toBe(false);
    });

    it('방이 없으면 NotFoundException을 던진다', () => {
      // GIVEN
      const leavePayload: LeaveUserDTO = { projectId: 'pX', userId: 'u1' };
      const client = { id: 's1' } as Socket;

      // WHEN + THEN
      expect(() => service.leaveUser(leavePayload, client)).toThrow(
        NotFoundException,
      );
    });

    it('방은 있지만 유저가 없으면 NotFoundException을 던진다', () => {
      // GIVEN
      const joinPayload: JoinUserDTO = {
        projectId: 'p1',
        user: { id: 'u1', nickname: 'user1', color: '#000000' },
      };
      const client = { id: 's1' } as Socket;
      service.joinUser(joinPayload, client);
      const leavePayload: LeaveUserDTO = { projectId: 'p1', userId: 'uX' };

      // WHEN + THEN
      expect(() => service.leaveUser(leavePayload, client)).toThrow(
        NotFoundException,
      );
    });
  });

  describe('handleDisconnect', () => {
    it('매핑이 없으면 null을 반환한다', () => {
      // WHEN
      const result = service.handleDisconnect('s-not-exist');

      // THEN
      expect(result).toBeNull();
    });

    it('매핑이 있으면 방에서 유저를 제거하고 roomId, userId를 반환한다', () => {
      // GIVEN
      const joinPayload: JoinUserDTO = {
        projectId: 'p1',
        user: { id: 'u1', nickname: 'user1', color: '#000000' },
      };
      const client = { id: 's1' } as Socket;
      service.joinUser(joinPayload, client);

      // WHEN
      const result = service.handleDisconnect('s1');

      // THEN
      expect(result).toEqual({ roomId: 'p1', userId: 'u1' });
      expect(service['rooms'].has('p1')).toBe(false);
      expect(service['socketToUser'].has('s1')).toBe(false);
    });

    it('방이 이미 없으면 매핑만 정리하고 null을 반환한다', () => {
      // GIVEN
      const joinPayload: JoinUserDTO = {
        projectId: 'p1',
        user: { id: 'u1', nickname: 'user1', color: '#000000' },
      };
      const client = { id: 's1' } as Socket;
      service.joinUser(joinPayload, client);

      // 강제로 방 삭제(비정상 상태 가정)
      service['rooms'].delete('p1');

      // WHEN
      const result = service.handleDisconnect('s1');

      // THEN
      expect(result).toBeNull();
      expect(service['socketToUser'].has('s1')).toBe(false);
    });
  });
});
