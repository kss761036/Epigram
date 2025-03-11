import { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: 'Components/Icon',
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
    color: {
      control: 'color',
      description: 'icon color (className에 설정된 tailwindcss text color 보다 우선순위 낮음)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'share',
  },
  parameters: {
    layout: 'centered',
  },
};
