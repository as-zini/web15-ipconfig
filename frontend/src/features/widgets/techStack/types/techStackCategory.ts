export type CommonCategory =
  | 'language'
  | 'packageManager'
  | 'testing'
  | 'monorepoManagement'
  | 'codeQuality'
  | 'messenger';

export type FrontendCategory =
  | 'framework'
  | 'styling'
  | 'stateManagement'
  | 'uiLibrary';

export type BackendCategory = 'framework' | 'apiArchitecture' | 'documentation';

export type DatabaseCategory =
  | 'mainDatabase'
  | 'ormAndQueryBuilder'
  | 'cachingAndMessageQueue'
  | 'fileStorage';

export type InfrastructureCategory =
  | 'deployment'
  | 'CI/CD'
  | 'monitoringAndLogging';

export type TechStackCategory =
  | FrontendCategory
  | BackendCategory
  | DatabaseCategory
  | InfrastructureCategory
  | CommonCategory;

// constants 또는 컴포넌트 내부에서 정의
const TECH_STACK_GROUPS = [
  {
    title: '공통 및 기반',
    items: COMMON_TECH_STACKS,
    categoryMap: {
      language: '언어',
      packageManager: '패키지 매니저',
      testing: '테스트',
      monorepoManagement: '모노레포 관리',
      codeQuality: '코드 퀄리티',
      messenger: '메신저',
    },
  },
  {
    title: '프론트엔드',
    items: FRONTEND_TECH_STACKS,
    categoryMap: {
      framework: '프레임워크',
      styling: '스타일링',
      stateManagement: '상태 관리',
      uiLibrary: 'UI 라이브러리',
    },
  },
  {
    title: '백엔드',
    items: BACKEND_TECH_STACKS,
    categoryMap: {
      framework: '프레임워크',
      apiArchitecture: 'API 아키텍처',
      documentation: '문서화',
    },
  },
  {
    title: '데이터베이스 및 스토리지',
    items: DATABASE_TECH_STACKS,
    categoryMap: {
      mainDatabase: '메인 DB',
      ormAndQueryBuilder: 'ORM & 쿼리 빌더',
      cachingAndMessageQueue: '캐싱 & 메시지 큐',
      fileStorage: '파일 스토리지',
    },
  },
  {
    title: '인프라 및 데브옵스',
    items: INFRASTRUCTURE_TECH_STACKS,
    categoryMap: {
      deployment: '배포 환경',
      'CI/CD': 'CI/CD',
      monitoringAndLogging: '모니터링 & 로깅',
    },
  },
];
