import { Meta, StoryObj } from '@storybook/react';
import IconButton from './IconButton';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'Components/IconButton',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['camera', 'arrowDown'],
      description: '아이콘 버튼의 variant',
    },
    className: { control: 'text', description: '추가 클래스' },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Camera: Story = {
  args: {
    variant: 'camera',
  },
  parameters: {
    layout: 'centered',
  },
};

export const arrowUp: Story = {
  args: {
    variant: 'arrowUp',
  },
  parameters: {
    layout: 'centered',
  },
};
