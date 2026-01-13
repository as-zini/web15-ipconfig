import type { Meta, StoryObj } from '@storybook/react-vite';
import TeamMemberList from './TeamMemberList';

const meta = {
  title: 'Pages/Workspace/InfoPanel/TeamMemberList',
  component: TeamMemberList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minWidth: '320px', minHeight: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TeamMemberList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onUserHover: (e, user) => {
      console.log('Hovered user:', user);
    },
    onUserLeave: () => {
      console.log('User leave');
    },
  },
};

export const WithInteraction: Story = {
  args: {
    onUserHover: (e, user) => {
      console.log('Hovered user:', user.name);
    },
    onUserLeave: () => {
      console.log('Left user card');
    },
  },
};
