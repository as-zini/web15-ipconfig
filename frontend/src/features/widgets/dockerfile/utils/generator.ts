import type { DockerfileData } from '@/common/types/yjsWidgetContent';

const generateNodeDockerfile = (content: DockerfileData): string => {
  const { version = '22', port = 3000, packageManager = 'npm' } = content;

  return `# Node.js Dockerfile
FROM node:${version}-alpine

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* bun.lockb* ./

RUN ${packageManager} install

COPY . .

ENV NODE_ENV=development
ENV HOSTNAME="0.0.0.0"

EXPOSE ${port}

CMD ["${packageManager}", "run", "dev"]`;
};

export const generateDockerfile = (content: DockerfileData): string => {
  switch (content.framework) {
    case 'Node.js':
      return generateNodeDockerfile(content);
    default:
      return '# Select a framework to generate Dockerfile';
  }
};
