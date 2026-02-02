/**
 * 위젯 레이어 순서 행동 테스트
 *
 * 구현 방식(배열 순서 vs focusedAt)과 무관하게 동작만 검증한다.
 *
 * 1) 단일 클라이언트: 위젯을 최상단으로 올리면 해당 위젯이 맨 위에 있어야 함
 * 2) 동시성(같은 위젯): 두 클라이언트가 동시에 같은 위젯 → 일관된 상태로 수렴
 * 3) 동시성(다른 위젯): 두 클라이언트가 동시에 다른 위젯 → 일관된 상태로 수렴
 * 4) 스트레스: 랜덤 전달 순서에서도 일관성 유지
 */

import { describe, it, expect } from 'vitest';
import * as Y from 'yjs';
import { bringToFrontLogic } from './widgetFrame';

/**
 * 위젯 초기화
 */
function initWidgets(doc: Y.Doc, widgetIds: string[]): void {
  const widgetOrder = doc.getArray<string>('widgetOrder');

  doc.transact(() => {
    widgetIds.forEach((id) => {
      widgetOrder.push([id]);
    });
  });
}

/**
 * 위젯을 최상단으로 올리는 동작 (실제 프로덕션 코드 사용)
 *
 * 향후 focusedAt 방식으로 전환 시 이 함수만 수정
 */
function bringToFront(doc: Y.Doc, widgetId: string): void {
  doc.transact(() => {
    const widgetOrder = doc.getArray<string>('widgetOrder');
    bringToFrontLogic(widgetOrder, widgetId);
  });
}

/**
 * 최상단 위젯 ID 반환
 *
 * 현재: 배열 마지막 요소
 * 향후 focusedAt 방식: focusedAt 최댓값을 가진 위젯
 */
function getTopWidget(doc: Y.Doc): string | undefined {
  const widgetOrder = doc.getArray<string>('widgetOrder');
  const arr = widgetOrder.toArray();
  return arr[arr.length - 1];
}

/**
 * 위젯 순서 배열 반환 (레이어 순)
 */
function getWidgetOrder(doc: Y.Doc): string[] {
  return doc.getArray<string>('widgetOrder').toArray();
}

// ============================================================================
// 테스트 유틸리티
// ============================================================================

interface SyncPair {
  docA: Y.Doc;
  docB: Y.Doc;
  flushBoth: (order?: 'A_FIRST' | 'B_FIRST') => void;
}

function createSyncedDocsWithUpdateQueue(): SyncPair {
  const docA = new Y.Doc();
  const docB = new Y.Doc();

  const updatesA: Uint8Array[] = [];
  const updatesB: Uint8Array[] = [];

  docA.on('update', (u: Uint8Array) => updatesA.push(u));
  docB.on('update', (u: Uint8Array) => updatesB.push(u));

  const flushAtoB = () => {
    while (updatesA.length) Y.applyUpdate(docB, updatesA.shift()!);
  };
  const flushBtoA = () => {
    while (updatesB.length) Y.applyUpdate(docA, updatesB.shift()!);
  };

  const flushBoth = (order: 'A_FIRST' | 'B_FIRST' = 'A_FIRST') => {
    if (order === 'A_FIRST') {
      flushAtoB();
      flushBtoA();
    } else {
      flushBtoA();
      flushAtoB();
    }
  };

  return { docA, docB, flushBoth };
}

function expectNoDuplicates(arr: string[]) {
  expect(new Set(arr).size).toBe(arr.length);
}

function expectSameElements(arr: string[], expected: string[]) {
  expect(arr.length).toBe(expected.length);
  expect(new Set(arr)).toEqual(new Set(expected));
}

// ============================================================================
// 테스트 케이스 (행동 기반 - 구현과 무관)
// ============================================================================

describe('위젯 레이어 순서 동작 테스트', () => {
  describe('단일 클라이언트', () => {
    it('위젯을 최상단으로 올리면 해당 위젯이 맨 위에 있어야 한다', () => {
      const doc = new Y.Doc();
      const widgetIds = ['A', 'B', 'C', 'D'];
      initWidgets(doc, widgetIds);

      bringToFront(doc, 'B');

      // 행동 검증: B가 최상단인가?
      expect(getTopWidget(doc)).toBe('B');

      // 부수 검증: 위젯 개수/중복 없음
      const order = getWidgetOrder(doc);
      expect(order.length).toBe(4);
      expectNoDuplicates(order);
      expectSameElements(order, widgetIds);
    });

    it('이미 최상단인 위젯을 다시 올려도 상태가 유지되어야 한다', () => {
      const doc = new Y.Doc();
      const widgetIds = ['A', 'B', 'C'];
      initWidgets(doc, widgetIds);

      bringToFront(doc, 'C'); // 이미 맨 뒤
      bringToFront(doc, 'C'); // 다시 호출

      expect(getTopWidget(doc)).toBe('C');
      expect(getWidgetOrder(doc).length).toBe(3);
    });
  });

  describe('동시성 - 같은 위젯', () => {
    it('두 클라이언트가 동시에 같은 위젯을 올려도 일관된 상태로 수렴해야 한다', () => {
      const run = (deliveryOrder: 'A_FIRST' | 'B_FIRST') => {
        const { docA, docB, flushBoth } = createSyncedDocsWithUpdateQueue();
        const widgetIds = ['W1', 'W2', 'TARGET', 'W3'];

        initWidgets(docA, widgetIds);
        flushBoth('A_FIRST');

        // 동시에 같은 위젯을 최상단으로
        bringToFront(docA, 'TARGET');
        bringToFront(docB, 'TARGET');

        flushBoth(deliveryOrder);

        const orderA = getWidgetOrder(docA);
        const orderB = getWidgetOrder(docB);

        // 1. 중복 없음
        expectNoDuplicates(orderA);
        expectNoDuplicates(orderB);

        // 2. 위젯 개수 유지
        expect(orderA.length).toBe(4);
        expect(orderB.length).toBe(4);

        // 3. 모든 위젯 존재
        expectSameElements(orderA, widgetIds);
        expectSameElements(orderB, widgetIds);

        // 4. Eventual Consistency: 두 클라이언트 상태가 동일
        expect(orderA).toEqual(orderB);

        // 5. TARGET이 정확히 한 번만 존재
        expect(orderA.filter((x) => x === 'TARGET').length).toBe(1);
      };

      run('A_FIRST');
      run('B_FIRST');
    });
  });

  describe('동시성 - 서로 다른 위젯', () => {
    it('두 클라이언트가 동시에 다른 위젯을 올려도 일관된 상태로 수렴해야 한다', () => {
      const { docA, docB, flushBoth } = createSyncedDocsWithUpdateQueue();
      const widgetIds = ['W1', 'W2', 'W3', 'W4'];

      initWidgets(docA, widgetIds);
      flushBoth('A_FIRST');

      // 동시에 다른 위젯을 최상단으로
      bringToFront(docA, 'W1');
      bringToFront(docB, 'W4');

      flushBoth('B_FIRST');

      const orderA = getWidgetOrder(docA);
      const orderB = getWidgetOrder(docB);

      // 중복 없음 + 개수 유지
      expectNoDuplicates(orderA);
      expect(orderA.length).toBe(4);
      expectSameElements(orderA, widgetIds);

      // 일관성 검증
      expect(orderA).toEqual(orderB);
    });
  });

  describe('스트레스 테스트', () => {
    it('랜덤 전달 순서에서도 일관성이 유지되어야 한다', () => {
      const ROUNDS = 25;

      for (let i = 0; i < ROUNDS; i++) {
        const { docA, docB, flushBoth } = createSyncedDocsWithUpdateQueue();
        const widgetIds = ['W1', 'TARGET', 'W2', 'W3'];

        initWidgets(docA, widgetIds);
        flushBoth('A_FIRST');

        bringToFront(docA, 'TARGET');
        bringToFront(docB, 'TARGET');

        flushBoth(Math.random() < 0.5 ? 'A_FIRST' : 'B_FIRST');

        const orderA = getWidgetOrder(docA);
        const orderB = getWidgetOrder(docB);

        // 핵심 검증
        expect(orderA.filter((x) => x === 'TARGET').length).toBe(1);
        expect(orderA.length).toBe(4);
        expectNoDuplicates(orderA);
        expectSameElements(orderA, widgetIds);
        expect(orderA).toEqual(orderB);
      }
    });

    it('여러 위젯을 순차적으로 올려도 상태가 올바르게 유지되어야 한다', () => {
      const doc = new Y.Doc();
      const widgetIds = ['A', 'B', 'C', 'D', 'E'];
      initWidgets(doc, widgetIds);

      // 순차적으로 여러 위젯 올리기
      bringToFront(doc, 'C');
      expect(getTopWidget(doc)).toBe('C');

      bringToFront(doc, 'A');
      expect(getTopWidget(doc)).toBe('A');

      bringToFront(doc, 'E');
      expect(getTopWidget(doc)).toBe('E');

      // 최종 상태 검증
      const order = getWidgetOrder(doc);
      expect(order.length).toBe(5);
      expectNoDuplicates(order);
    });
  });
});
