import { Meta, StoryObj } from '@storybook/react';
import Emoji from './Emoji';
import { EMOTION } from '@/types/common';

const meta: Meta<typeof Emoji> = {
  component: Emoji,
  title: 'Components/Emoji',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '이 컴포넌트는 SVGProps<SVGSVGElement>를 확장하여 모든 SVG 속성을 지원합니다. \n className에 tailwindcss를 활용하여, 반응형처리를 할 수 있습니다.',
      },
    },
  },
  argTypes: {
    name: { control: 'select', description: 'icon name' },
    size: {
      control: 'number',
      description: 'icon size\n(className에 설정된 tailwindcss width 보다 우선순위 낮음)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Emoji>;

export const Default: Story = {
  args: {
    name: EMOTION.HAPPY,
  },
  parameters: {
    layout: 'centered',
  },
};
