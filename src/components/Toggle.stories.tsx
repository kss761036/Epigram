import { Meta, StoryObj } from '@storybook/react';
import Toggle from './Toggle';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: 'Components/Toggle',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '공용 Toggle 컴포넌트',
      },
    },
  },
  argTypes: {
    checked: {
      description: '토글의 현재 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      description: '타입 설정, checkbox | radio',
      table: {
        type: { summary: "'checkbox' | 'radio'" },
        defaultValue: { summary: "'checkbox'" },
      },
      control: 'select',
    },
    labelColor: {
      description: '라벨 색상 ( 테일윈드 className으로 작성 )',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'text-gray-400'" },
      },
      control: 'text',
    },
    label: {
      description: '라벨 ( 없으면 노출안됨 )',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      control: 'text',
    },
    className: {
      description: '추가 className',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      control: 'text',
    },
    onChange: {
      description: '토글 상태가 변경될 때 호출되는 콜백 함수',
      table: {
        type: { summary: '(checked: boolean) => void' },
        defaultValue: { summary: 'undefined' },
      },
      action: 'changed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const 체크전: Story = {
  args: {
    checked: false,
    label: '공개',
  },
  parameters: {
    layout: 'centered',
  },
};

export const 체크후: Story = {
  args: {
    checked: true,
    label: '공개',
  },
  parameters: {
    layout: 'centered',
  },
};
