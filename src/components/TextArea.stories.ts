import { Meta, StoryObj } from '@storybook/react';
import TextArea from './TextArea';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: 'Components/TextArea',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '공용 TextArea 컴포넌트',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: '500자 이내로 입력해주세요.',
    className: '',
  },
  parameters: {
    layout: 'centered',
  },
};

export const WithError: Story = {
  args: {
    placeholder: '500자 이내로 입력해주세요.',
    className: '',
    error: '500자 이내로 입력해주세요.',
  },
  parameters: {
    layout: 'centered',
  },
};
