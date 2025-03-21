import { Meta, StoryObj } from '@storybook/react';
import Radio from './Radio';

const meta: Meta<typeof Radio> = {
  component: Radio,
  title: 'Components/Radio',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '공용 Radio 컴포넌트',
      },
    },
  },
  argTypes: {
    checked: {
      description: 'Radio의 현재 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    label: {
      description: '라벨 (필수값)',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
    name: {
      description: 'radio 그룹 이름 (name 속성)',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
    onChange: {
      description: '선택 시 호출되는 콜백 함수',
      table: {
        type: { summary: '(value: string) => void' },
        defaultValue: { summary: 'undefined' },
      },
      action: 'changed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const 체크전: Story = {
  args: {
    name: 'group1',
    checked: false,
    label: '직접입력',
  },
  parameters: {
    layout: 'centered',
  },
};

export const 체크후: Story = {
  args: {
    name: 'group1',
    checked: true,
    label: '직접입력',
  },
  parameters: {
    layout: 'centered',
  },
};
