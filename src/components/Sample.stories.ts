import { Meta, StoryObj } from '@storybook/react';
import Sample from './Sample';

const meta: Meta<typeof Sample> = {
  component: Sample,
  title: 'Components/Sample',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sample>;

export const Default: Story = {
  args: {
    color: 'primary',
    children: 'Sample',
  },
  parameters: {
    layout: 'centered',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: 'Sample',
  },
  parameters: {
    layout: 'centered',
  },
};
