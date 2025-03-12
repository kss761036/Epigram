import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
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
    variant: { control: 'select', description: '스타일 variant', options: ['default', 'outlined'] },
    size: {
      control: 'select',
      description:
        '버튼 size, default = 입력폼 | xs = 댓글 저장 버튼 | md = 랜딩 페이지 버튼 | lg = 사용처 없음',
      options: ['default', 'xs', 'md', 'lg'],
    },
    className: { control: 'text', description: 'className' },
    children: { control: 'text', description: '버튼 텍스트' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: '가입하기',
    className: 'w-[640px]',
  },
  parameters: {
    layout: 'centered',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    variant: 'default',
    size: 'default',
    children: '가입하기',
    className: 'w-[640px]',
  },
  parameters: {
    layout: 'centered',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    size: 'default',
    children: '가입하기',
  },
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'custom' },
  },
};
