import { Meta, StoryObj } from '@storybook/react';
import Toggle from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    isChecked: { control: 'boolean' },
    color: { control: 'text' },
    text: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    isChecked: false,
    text: '공개',
  },
  parameters: {
    layout: 'centered',
  },
};

export const Checked: Story = {
  args: {
    isChecked: true,
    text: '공개',
  },
  parameters: {
    layout: 'centered',
  },
};
