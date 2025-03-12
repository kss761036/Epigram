import { Meta, StoryObj } from '@storybook/react';
import Toggle from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    isChecked: { control: 'boolean' },
    color: { control: 'text' },
    label: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    isChecked: false,
    label: '공개',
    id: 'toggle_1',
  },
  parameters: {
    layout: 'centered',
  },
};

export const Checked: Story = {
  args: {
    isChecked: true,
    label: '공개',
    id: 'toggle_2',
  },
  parameters: {
    layout: 'centered',
  },
};
