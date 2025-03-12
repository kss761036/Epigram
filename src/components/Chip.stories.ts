import { Meta, StoryObj } from '@storybook/react';
import Chip from './Chip';

const meta: Meta<typeof Chip> = {
  component: Chip,
  title: 'Components/Chip',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '칩에 표시될 텍스트',
    },
    onRemove: {
      control: 'boolean',
      description: '칩 삭제 핸들러',
    },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    label: 'Tag',
  },
  parameters: {
    layout: 'centered',
  },
};

export const Removable: Story = {
  args: {
    label: 'Tag',
    onRemove: () => alert('칩 삭제'),
  },
  parameters: {
    layout: 'centered',
  },
};
