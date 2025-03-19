import { Meta, StoryObj } from '@storybook/react';
import Sample from './Sample';
import Spinner from './Spinner';

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: 'Components/Spinner',
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'tailwind classname : text-(color) (뒷 원), fill-(color) (앞 원)',
      control: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '댓글 컴포넌트',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sample>;

export const Default: Story = {
  args: {
    className: 'fill-black text-gray-100',
  },
  parameters: {
    layout: 'centered',
  },
};
