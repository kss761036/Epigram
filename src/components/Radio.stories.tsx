import { Meta, StoryObj } from '@storybook/react';
import Radio from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    isChecked: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    isChecked: false,
  },
  parameters: {
    layout: 'centered',
  },
};

export const Checked: Story = {
  args: {
    isChecked: true,
  },
  parameters: {
    layout: 'centered',
  },
};
