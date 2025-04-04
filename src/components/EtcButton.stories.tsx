import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Link from 'next/link';
import EtcButton from './EtcButton';
import Icon from './Icon';

const MockLink = ({ href, children, ...props }: ComponentProps<typeof Link>) => {
  return (
    <a href={typeof href === 'string' ? href : ''} {...props}>
      {children}
    </a>
  );
};

Object.defineProperty(Link, 'default', {
  configurable: true,
  value: MockLink,
});

const meta: Meta<typeof EtcButton> = {
  component: EtcButton,
  title: 'Components/EtcButton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '기타 버튼 컴포넌트',
      },
    },
  },

  argTypes: {
    children: {
      description:
        '버튼 내용 (JSX가능)<br /><br />예시)<br /><><br />&nbsp;&nbsp;<아이콘 컴포넌트/> 더보기<br /></>',
      control: { type: 'text' },
      table: {
        defaultValue: { summary: '버튼' },
      },
    },
    variant: {
      description: '버튼 스타일 (default | outlined)',
      options: ['default', 'outlined'],
      control: { type: 'select' },
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      description: '버튼 크기 (default | lg)',
      options: ['default', 'lg'],
      control: { type: 'select' },
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    href: {
      description: '링크 주소 (있으면 버튼이 Link로 렌더링)',
      control: { type: 'text' },
      table: {
        type: { summary: 'text' },
      },
    },
    target: {
      description: '링크 target 속성 (링크 주소가 있을 때만 적용)',
      options: ['_self', '_blank', '_parent', '_top'],
      control: { type: 'select' },
    },
    onClick: { action: 'clicked', description: '버튼 클릭 이벤트' },
  },
};

export default meta;
type Story = StoryObj<typeof EtcButton>;

export const 기본버튼: Story = {
  args: {
    children: '버튼',
    variant: 'default',
    size: 'default',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '기본 버튼 스타일',
      },
    },
  },
};
기본버튼.storyName = 'Primary';

export const 더보기: Story = {
  args: {
    children: (
      <>
        <Icon name='plus' /> 더보기
      </>
    ),
    variant: 'outlined',
    size: 'lg',
  },
  parameters: {
    layout: 'centered',
  },
};

export const 애피그램만들기: Story = {
  args: {
    children: '애피그램 만들기',
    variant: 'outlined',
    size: 'lg',
  },
  parameters: {
    layout: 'centered',
  },
};

export const 좋아요: Story = {
  args: {
    children: (
      <>
        <Icon name='like' color='color-white' size={20} className='md:h-9 md:w-9' /> 123
      </>
    ),
    onClick: () => alert('좋아요!'),
    className: 'font-medium',
  },
  parameters: {
    layout: 'centered',
  },
};

export const 왕도로가는길: Story = {
  args: {
    children: (
      <>
        왕도로 가는길
        <Icon name='external' color='gray-300' size={20} className='md:h-9 md:w-9' />
      </>
    ),
    href: 'https://www.naver.com/',
    target: '_blank',
    className: 'bg-line-100 text-white font-medium text-gray-300',
  },
  parameters: {
    layout: 'centered',
  },
};
