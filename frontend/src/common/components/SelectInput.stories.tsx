import type { Meta, StoryObj } from '@storybook/react-vite';
import SelectInput from './SelectInput';
import { SUBJECT_GROUPS } from '@/common/mocks/techStacks';

const meta = {
  title: 'Common/SelectInput',
  component: SelectInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    initialOptions: SUBJECT_GROUPS,
  },
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <SelectInput {...args} />,
};
