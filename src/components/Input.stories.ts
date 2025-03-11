import { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Components/Input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '공용 Input 컴포넌트',
      },
    },
  },
  argTypes: {
    type: { control: 'select', description: '타입 설정, text | email | password | search ' },
    placeholder: {
      control: 'text',
      description: 'placeholder',
    },
    className: {
      control: 'text',
      description:
        'input 부분의 className을 추가 합니다.(우선 순위 최우선, 기존 className과 충돌 시 이 부분의 className을 사용합니다)',
    },
    error: {
      control: 'text',
      description: 'error',
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
    onSearch: {
      control: 'text',
      description: 'search 기능 핸들러 함수를 프롭으로 내려주시면 됩니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Text: Story = {
  args: {
    type: 'text',
    placeholder: '텍스트',
    className: '',
  },
  parameters: {
    layout: 'centered',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: '이메일',
    className: '',
  },
  parameters: {
    layout: 'centered',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호',
    className: '',
  },
  parameters: {
    layout: 'centered',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: '검색',
    className: '',
  },
  parameters: {
    layout: 'centered',
  },
};

export const WithError: Story = {
  args: {
    type: 'email',
    placeholder: '에러 예시',
    className: '',
    error: '이미 존재하는 닉네임입니다.',
  },
  parameters: {
    layout: 'centered',
  },
};

export const TextLabel: Story = {
  args: {
    type: 'text',
    placeholder: '텍스트',
    className: '',
    label: 'Text',
  },
  parameters: {
    layout: 'centered',
  },
};

export const EmailLabel: Story = {
  args: {
    type: 'email',
    placeholder: '이메일',
    className: '',
    label: '이메일',
  },
  parameters: {
    layout: 'centered',
  },
};

export const PasswordLabel: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호',
    className: '',
    label: '비밀번호',
  },
  parameters: {
    layout: 'centered',
  },
};

export const WithErrorLabel: Story = {
  args: {
    type: 'email',
    placeholder: '에러 예시',
    className: '',
    error: '이미 존재하는 닉네임입니다.',
    label: '에러',
  },
  parameters: {
    layout: 'centered',
  },
};
