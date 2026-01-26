import type { MultiSelector, Selector } from '@/common/types/yjsDoc';

export interface CollaborationData {
  prRules: {
    activeVersion: Selector;
    selectedLabels: MultiSelector;
    activeStrategy: Selector;
  };
  reviewPolicy: {
    approves: number;
    maxReviewHours: number;
    blockMerge: boolean;
  };
  workflow: {
    platform: Selector;
    cycleValue: number;
    cycleUnit: string;
  };
}
