import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
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
    },
    labelColor: {
      description: '라벨 색상 ( 테일윈드 className으로 작성 )',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'text-black-600'" },
      },
      control: 'text',
    },
    label: {
      description: '라벨 ( 필수값 )',
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
type Story = StoryObj<typeof Radio>;

export const 체크전: Story = {
  args: {
    checked: false,
    label: '직접입력',
  },
  parameters: {
    layout: 'centered',
  },
};

export const 체크후: Story = {
  args: {
    checked: true,
    label: '직접입력',
  },
  parameters: {
    layout: 'centered',
  },
};
