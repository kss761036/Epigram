import { Meta, StoryObj } from '@storybook/react';
import FormError from './FormError';

const meta: Meta<typeof FormError> = {
  component: FormError,
  title: 'Components/FormError',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '폼제출시 사용되는 에러메시지 블럭입니다.',
      },
    },
  },
  argTypes: {
    message: {
      contorl: 'input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormError>;

export const Default: Story = {
  args: {
    message: '오류가 발생했어요',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '기본 버튼 스타일',
      },
    },
  },
};
