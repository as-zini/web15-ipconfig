import type { Meta, StoryObj } from '@storybook/react-vite';
import WorkspaceHeader from './WorkspaceHeader';

const meta = {
  title: 'Pages/Workspace/WorkspaceHeader',
  component: WorkspaceHeader,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#111827' }],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onExportClick: {
      action: 'export clicked',
      description: '내보내기 버튼 클릭 핸들러',
    },
  },
} satisfies Meta<typeof WorkspaceHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onExportClick: () => console.log('Export clicked'),
  },
};

export const WithActions: Story = {
  args: {
    onExportClick: () => {
      console.log('Export button clicked');
      alert('문서를 내보냅니다!');
    },
  },
};
