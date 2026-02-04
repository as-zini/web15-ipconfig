import type {
  FrontendTechStack,
  BackendTechStack,
  DatabaseTechStack,
  InfrastructureTechStack,
  CommonTechStack,
} from '../types/techStack';

export const FRONTEND_TECH_STACKS: FrontendTechStack[] = [
  // Framework & Library
  { id: 'react', category: 'framework', name: 'React' },
  { id: 'nextjs', category: 'framework', name: 'Next.js' },
  { id: 'vue', category: 'framework', name: 'Vue.js' },
  { id: 'nuxt', category: 'framework', name: 'Nuxt' },
  { id: 'svelte', category: 'framework', name: 'Svelte' },
  { id: 'sveltekit', category: 'framework', name: 'SvelteKit' },
  { id: 'angular', category: 'framework', name: 'Angular' },
  { id: 'reactnative', category: 'framework', name: 'React Native' },
  { id: 'flutter', category: 'framework', name: 'Flutter' }, // Mobile 추가

  // State Management
  { id: 'redux', category: 'stateManagement', name: 'Redux' },
  { id: 'zustand', category: 'stateManagement', name: 'Zustand' },
  { id: 'tanstackquery', category: 'stateManagement', name: 'TanStack Query' },
  { id: 'recoil', category: 'stateManagement', name: 'Recoil' },
  { id: 'jotai', category: 'stateManagement', name: 'Jotai' },

  // Styling
  { id: 'tailwindcss', category: 'styling', name: 'Tailwind CSS' },
  { id: 'styledcomponents', category: 'styling', name: 'styled-components' },
  { id: 'emotion', category: 'styling', name: 'Emotion' },
  { id: 'sassscss', category: 'styling', name: 'Sass/SCSS' },
  { id: 'vanillaextract', category: 'styling', name: 'Vanilla Extract' },

  // UI Library
  { id: 'mui', category: 'uiLibrary', name: 'MUI' },
  { id: 'chakraui', category: 'uiLibrary', name: 'Chakra UI' },
  { id: 'antdesign', category: 'uiLibrary', name: 'Ant Design' },
  { id: 'shadcn/ui', category: 'uiLibrary', name: 'Shadcn/ui' },
  { id: 'headlessui', category: 'uiLibrary', name: 'Headless UI' },
];

export const BACKEND_TECH_STACKS: BackendTechStack[] = [
  // Framework
  { id: 'nestjs', category: 'framework', name: 'NestJS' },
  { id: 'expressjs', category: 'framework', name: 'Express.js' },
  { id: 'fastify', category: 'framework', name: 'Fastify' },
  { id: 'springboot', category: 'framework', name: 'Spring Boot' },
  { id: 'django', category: 'framework', name: 'Django' },
  { id: 'fastapi', category: 'framework', name: 'FastAPI' },
  { id: 'flask', category: 'framework', name: 'Flask' },
  { id: 'laravel', category: 'framework', name: 'Laravel' },
  { id: 'rubyonrails', category: 'framework', name: 'Ruby on Rails' },
  { id: 'gin', category: 'framework', name: 'Gin' },
  { id: 'aspnetcore', category: 'framework', name: 'ASP.NET Core' },
  { id: 'hono', category: 'framework', name: 'Hono' }, // 최신 트렌드 추가

  // API Architecture (New)
  { id: 'graphql', category: 'apiArchitecture', name: 'GraphQL' },
  { id: 'apollo', category: 'apiArchitecture', name: 'Apollo Server' },
  { id: 'trpc', category: 'apiArchitecture', name: 'tRPC' },
  { id: 'grpc', category: 'apiArchitecture', name: 'gRPC' },
  { id: 'socketio', category: 'apiArchitecture', name: 'Socket.io' },

  // Documentation (New)
  { id: 'swagger', category: 'documentation', name: 'Swagger' },
  { id: 'postman', category: 'documentation', name: 'Postman' }, // 문서화 도구로 분류
];

export const DATABASE_TECH_STACKS: DatabaseTechStack[] = [
  // Main Database
  { id: 'mysql', category: 'mainDatabase', name: 'MySQL' },
  { id: 'postgresql', category: 'mainDatabase', name: 'PostgreSQL' },
  { id: 'mariadb', category: 'mainDatabase', name: 'MariaDB' },
  { id: 'mongodb', category: 'mainDatabase', name: 'MongoDB' },
  { id: 'redis', category: 'cachingAndMessageQueue', name: 'Redis' }, // 주로 캐싱 용도라 아래로 분류 가능하나 Main DB로도 씀. 여기선 Caching으로 이동 추천하거나 유지.
  { id: 'dynamodb', category: 'mainDatabase', name: 'DynamoDB' },
  { id: 'supabase', category: 'mainDatabase', name: 'Supabase' },
  { id: 'firebase', category: 'mainDatabase', name: 'Firebase' },

  // ORM & Query Builder (Moved from Backend)
  { id: 'prisma', category: 'ormAndQueryBuilder', name: 'Prisma' },
  { id: 'typeorm', category: 'ormAndQueryBuilder', name: 'TypeORM' },
  { id: 'drizzleorm', category: 'ormAndQueryBuilder', name: 'Drizzle ORM' },
  { id: 'mongoose', category: 'ormAndQueryBuilder', name: 'Mongoose' },
  {
    id: 'jpa/hibernate',
    category: 'ormAndQueryBuilder',
    name: 'JPA / Hibernate',
  },
  { id: 'mybatis', category: 'ormAndQueryBuilder', name: 'MyBatis' },
  { id: 'sequelize', category: 'ormAndQueryBuilder', name: 'Sequelize' },

  // Caching & Message Queue
  { id: 'kafka', category: 'cachingAndMessageQueue', name: 'Kafka' },
  { id: 'rabbitmq', category: 'cachingAndMessageQueue', name: 'RabbitMQ' },
  { id: 'memcached', category: 'cachingAndMessageQueue', name: 'Memcached' },

  // File Storage (New)
  { id: 's3', category: 'fileStorage', name: 'AWS S3' },
  { id: 'minio', category: 'fileStorage', name: 'MinIO' },
];

export const INFRASTRUCTURE_TECH_STACKS: InfrastructureTechStack[] = [
  // Deployment
  { id: 'aws', category: 'deployment', name: 'AWS' },
  { id: 'gcp', category: 'deployment', name: 'GCP' },
  { id: 'azure', category: 'deployment', name: 'Azure' },
  { id: 'vercel', category: 'deployment', name: 'Vercel' },
  { id: 'netlify', category: 'deployment', name: 'Netlify' },
  { id: 'docker', category: 'deployment', name: 'Docker' },
  { id: 'kubernetes', category: 'deployment', name: 'Kubernetes' },
  { id: 'nginx', category: 'deployment', name: 'Nginx' },
  { id: 'cloudflare', category: 'deployment', name: 'Cloudflare' },

  // CI/CD
  { id: 'githubactions', category: 'CI/CD', name: 'GitHub Actions' },
  { id: 'jenkins', category: 'CI/CD', name: 'Jenkins' },
  { id: 'gitlabci', category: 'CI/CD', name: 'GitLab CI' },
  { id: 'circleci', category: 'CI/CD', name: 'CircleCI' }, // 추가

  // Monitoring & Logging (New)
  { id: 'sentry', category: 'monitoringAndLogging', name: 'Sentry' },
  { id: 'datadog', category: 'monitoringAndLogging', name: 'Datadog' },
  { id: 'grafana', category: 'monitoringAndLogging', name: 'Grafana' },
  { id: 'prometheus', category: 'monitoringAndLogging', name: 'Prometheus' },
];

export const COMMON_TECH_STACKS: CommonTechStack[] = [
  // Languages (Moved from Front/Back)
  { id: 'javascript', category: 'language', name: 'JavaScript' },
  { id: 'typescript', category: 'language', name: 'TypeScript' },
  { id: 'java', category: 'language', name: 'Java' },
  { id: 'python', category: 'language', name: 'Python' },
  { id: 'go', category: 'language', name: 'Go' },
  { id: 'rust', category: 'language', name: 'Rust' },
  { id: 'kotlin', category: 'language', name: 'Kotlin' },
  { id: 'swift', category: 'language', name: 'Swift' },

  // Package Manager (New)
  { id: 'npm', category: 'packageManager', name: 'npm' },
  { id: 'yarn', category: 'packageManager', name: 'Yarn' },
  { id: 'pnpm', category: 'packageManager', name: 'pnpm' },
  { id: 'bun', category: 'packageManager', name: 'Bun' },

  // Testing (New)
  { id: 'jest', category: 'testing', name: 'Jest' },
  { id: 'vitest', category: 'testing', name: 'Vitest' },
  { id: 'cypress', category: 'testing', name: 'Cypress' },
  { id: 'playwright', category: 'testing', name: 'Playwright' },
  { id: 'storybook', category: 'testing', name: 'Storybook' },

  // Monorepo & Repo Management (New)
  { id: 'turborepo', category: 'monorepoManagement', name: 'Turborepo' },
  { id: 'nx', category: 'monorepoManagement', name: 'Nx' },
  { id: 'git', category: 'monorepoManagement', name: 'Git' }, // 소스 관리를 여기 혹은 codeQuality로 분류
  { id: 'github', category: 'monorepoManagement', name: 'GitHub' },

  // Code Quality
  { id: 'eslint', category: 'codeQuality', name: 'ESLint' },
  { id: 'prettier', category: 'codeQuality', name: 'Prettier' },
  { id: 'sonarqube', category: 'codeQuality', name: 'SonarQube' },

  // Messenger
  { id: 'slack', category: 'messenger', name: 'Slack' },
  { id: 'discord', category: 'messenger', name: 'Discord' },
  { id: 'msteams', category: 'messenger', name: 'Microsoft Teams' },
];
// 예외 처리가 필요한 이름들을 매핑(Simple Icons 슬러그 기준)
export const iconMap: Record<string, string> = {
  'React Native': 'react',
  'C#': 'csharp',
  'Express.js': 'express',
  GCP: 'googlecloud',
  NCP: 'naver',
  'Photoshop / Illustrator': 'adobephotoshop',
  'styled-components': 'styledcomponents',
  SvelteKit: 'svelte',
  'TanStack Query': 'tanstack',
  'Shadcn/ui': 'shadcnui',
  'Drizzle ORM': 'drizzle',
  Cassandra: 'apachecassandra',
  'JPA / Hibernate': 'hibernate',
  MyBatis: 'mybatis',
  Kafka: 'kafka',
  'GitLab CI': 'gitlab',
};
