import { Meta, StoryObj } from '@storybook/react';
import ErrorFallback from './ErrorFallback';

const meta: Meta<typeof ErrorFallback> = {
  component: ErrorFallback,
  title: 'Components/ErrorFallback',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '에러페이지용 컴포넌트',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
    },
    content: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorFallback>;

export const Default: Story = {
  args: {
    title: '에러 타이틀',
    content: '에러 메세지',
  },
};
