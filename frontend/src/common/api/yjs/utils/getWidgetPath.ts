import type { WidgetType } from '@/common/types/yjsTypes';
import { getWidgetMap } from './getMaps';
import * as Y from 'yjs';

// [위젯 타입] -> [필드 키] -> [실제 Yjs 경로]
/**
 * 위젯 타입별 필드와 실제 Yjs 데이터 구조 내 경로를 매핑한 객체입니다.
 *
 * 구조:
 * {
 *   [WIDGET_TYPE]: {
 *     [fieldKey]: ['path', 'to', 'property']
 *   }
 * }
 *
 * - fieldKey: 클라이언트(UI)에서 사용하는 추상화된 필드 이름
 * - value(배열): Yjs Y.Map 구조에서 해당 데이터를 찾아가기 위한 키들의 순서
 */
export const WIDGET_PATH_MAP: Record<string, Record<string, string[]>> = {
  GIT_CONVENTION: {
    // 1. Primitive Fields (값 수정용)
    mainBranch: ['branchRules', 'mainBranch'],
    developBranch: ['branchRules', 'developBranch'],
    useGitmoji: ['commitConvention', 'useGitmoji'],

    // 2. Selectors (옵션 선택용)
    strategy: ['strategy'],
    prefixes: ['branchRules', 'prefixes'],
    commitTypes: ['commitConvention', 'commitTypes'],
  },
  TECH_STACK: {
    subject: ['subject'],
    techItems: ['techItems'], // 배열이지만 여기선 경로만 정의
  },
  COMMUNICATION: {
    urgent: ['communication', 'urgent'],
    sync: ['communication', 'sync'],
    async: ['communication', 'async'],
    official: ['communication', 'official'],
    responseTime: ['sla', 'responseTime'],
    coreTimeStart: ['timeManagement', 'coreTimeStart'],
    coreTimeEnd: ['timeManagement', 'coreTimeEnd'],
    noMeetingDay: ['meeting', 'noMeetingDay'],
    feedbackStyle: ['meeting', 'feedbackStyle'],
  },
  GROUNDRULE_COLLABORATION: {
    approves: ['reviewPolicy', 'approves'],
    maxReviewHours: ['reviewPolicy', 'maxReviewHours'],
    blockMerge: ['reviewPolicy', 'blockMerge'],
    activeVersion: ['prRules', 'activeVersion'],
    labelRules: ['prRules', 'labelRules'],
    activeStrategy: ['prRules', 'activeStrategy'],
    platform: ['workflow', 'platform'],
    cycleValue: ['workflow', 'cycleValue'],
    cycleUnit: ['workflow', 'cycleUnit'],
  },
};

/**
 * 헬퍼: 위젯 타입과 필드명으로 실제 경로 배열 찾기
 *
 * @param type - 위젯 타입 (예: GIT_CONVENTION)
 * @param fieldKey - 필드 식별자 (예: useGitmoji)
 * @returns {string[] | null} - Yjs 경로 배열 (예: ['commitConvention', 'useGitmoji']) 또는 null
 */
export const getMappedPath = (
  type: WidgetType,
  fieldKey: string,
): string[] | null => {
  const typeMap = WIDGET_PATH_MAP[type];
  if (!typeMap || !typeMap[fieldKey]) {
    console.warn(`[PathMap] 매핑되지 않은 필드: ${type} -> ${fieldKey}`);
    return null;
  }
  return typeMap[fieldKey];
};

// 공통 헬퍼: 경로를 따라가서 Target Y.Map 찾기
/**
 * 주어진 경로 배열을 순회하며 최종적으로 도달하는 Y.Map 객체를 반환합니다.
 * 중간 경로가 없거나 Y.Map이 아닌 경우 null을 반환합니다.
 *
 * @param widgetId - 탐색할 위젯의 ID
 * @param path - 도달하고자 하는 경로 (문자열 배열)
 * @returns {Y.Map<unknown> | null} - 대상 Y.Map 객체
 */
export const getTargetMap = (
  widgetId: string,
  path: string[],
): Y.Map<unknown> | null => {
  const widgetMap = getWidgetMap(widgetId);
  if (!widgetMap) return null;

  let currentMap = widgetMap.get('content') as Y.Map<unknown>;
  // path가 빈 배열이면 content 루트 맵 반환
  if (!currentMap) return null;

  for (const key of path) {
    if (currentMap.has(key)) {
      const next = currentMap.get(key);
      if (next instanceof Y.Map) {
        currentMap = next as Y.Map<unknown>;
      } else {
        console.warn(`[Yjs] 경로 탐색 실패 (Map이 아님): ${key}`);
        return null;
      }
    } else {
      console.warn(`[Yjs] 경로 탐색 실패 (키 없음): ${key}`);
      return null;
    }
  }
  return currentMap;
};
