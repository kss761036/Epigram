import { Meta, StoryObj } from '@storybook/react';
import { EMOTION } from '@/types/common';
import EmojiButton from './EmojiButton';

const meta: Meta<typeof EmojiButton> = {
  component: EmojiButton,
  title: 'Components/EmojiButton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '이모지 드롭다운, 이모지 선택 버튼에 사용되는 버튼입니다.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      description: Object.values(EMOTION).join(' | '),
      options: Object.values(EMOTION),
    },
    selected: {
      control: 'boolean',
    },
    withLabel: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmojiButton>;

export const Default: Story = {
  args: {
    name: EMOTION.HAPPY,
  },
  render: (args) => {
    return (
      <div className='w-14 md:w-16 lg:w-24'>
        <EmojiButton {...args} />
      </div>
    );
  },
  parameters: {
    layout: 'centered',
  },
};

export const NoLabel: Story = {
  args: {
    name: EMOTION.ANGRY,
    withLabel: false,
  },
  render: (args) => {
    return (
      <div className='w-14 md:w-16 lg:w-24'>
        <EmojiButton {...args} />
      </div>
    );
  },
  parameters: {
    layout: 'centered',
  },
};

export const NoLabelWithSelected: Story = {
  args: {
    name: EMOTION.WORRIED,
    withLabel: false,
    selected: true,
  },
  render: (args) => {
    return (
      <div className='w-14 md:w-16 lg:w-24'>
        <EmojiButton {...args} />
      </div>
    );
  },
  parameters: {
    layout: 'centered',
  },
};
