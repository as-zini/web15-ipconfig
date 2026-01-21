// Selector 공통 타입
export interface OptionItem {
  value: string;
  createdAt: number;
}

export interface Selector {
  selectedId: string;
  options: Record<string, OptionItem>;
}

export interface MultiSelector {
  selectedIds: string[];
  options: Record<string, OptionItem>;
}

// Union Content Type
export type WidgetContent =
  | TechStackContent
  | GitConventionContent
  | CommunicationContent
  | CollaborationContent
  | PostItContent
  | Record<string, unknown>;

// Main Widget Data Interface
export interface WidgetData<T extends WidgetContent = WidgetContent> {
  widgetId: string;
  type: WidgetType;
  layout: {
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
  };
  content: T; // 위젯별 커스텀
  createdAt: number;
}

export interface WorkspaceData {
  root: {
    schemaVersion: number;
    workspace: {
      id: string;
      createdAt: number;
    };
    widgets: Record<string, WidgetData>;
    widgetOrder: string[];
  };
}

// Widget Types
export type WidgetType =
  | 'TECH_STACK'
  | 'POST_IT'
  | 'GIT_CONVENTION'
  | 'GROUNDRULE_COLLABORATION'
  | 'COMMUNICATION';

// 이 밑에서부터는 위젯별 컨텐츠 타입이라 각 위젯 연결할때 세분화하면 좋을 것 같습니다.

// 1. TECH_STACK
export interface TechStackContent {
  subject: Selector;
  techItems: Array<{
    id: string;
    name: string;
    category: string;
  }>;
}

// 2. GIT_CONVENTION
export interface GitConventionContent {
  strategy: Selector;
  branchRules: {
    mainBranch: string;
    developBranch: string;
    prefixes: MultiSelector;
  };
  commitConvention: {
    useGitmoji: boolean;
    commitTypes: MultiSelector;
  };
}

// 3. COMMUNICATION
export interface CommunicationContent {
  strategy: Selector;
  branchRules: {
    mainBranch: string;
    developBranch: string;
    prefixes: MultiSelector;
  };
  commitConvention: {
    useGitmoji: boolean;
    commitTypes: MultiSelector;
  };
}

// 4. GROUNDRULE_COLLABORATION
export interface CollaborationContent {
  prRules: {
    activeVersion: Selector;
    activeStrategy: Selector;
    labelRules: MultiSelector;
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

// 5. POST_IT (Example placeholder)
export interface PostItContent {
  text: string;
  color: string;
}
