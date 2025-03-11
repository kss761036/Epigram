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
  argTypes: {
    error: {
      control: 'text',
      description: 'error',
    },
    errorClassName: {
      control: 'text',
      description:
        'error 부분의 className을 추가 합니다.(우선 순위 최우선, 기존 className과 충돌 시 이 부분의 className을 사용합니다)',
    },
    className: {
      control: 'text',
      description:
        'textarea 부분의 className을 추가 합니다.(우선 순위 최우선, 기존 className과 충돌 시 이 부분의 className을 사용합니다)',
    },
    placeholder: {
      control: 'text',
      description: 'placeholder',
    },
    label: {
      control: 'text',
      description: 'label이 없는 경우 미입력',
    },
    labelClassName: {
      control: 'text',
      description:
        'label 부분의 className을 추가 합니다.(우선 순위 최우선, 기존 className과 충돌 시 이 부분의 className을 사용합니다)',
    },
    required: {
      control: 'boolean',
      description: '입력폼에서 필수 항목인 경우 required prop을 사용하면 라벨 우측에 *이 생깁니다.',
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

export const DefaultLabel: Story = {
  args: {
    placeholder: '500자 이내로 입력해주세요.',
    className: '',
    label: '내용',
    required: true,
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
