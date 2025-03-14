import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Card from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Components/Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '공용 Card 컴포넌트',
      },
    },
  },
  argTypes: {
    content: {
      description: '콘텐츠 내용',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
    author: {
      description: '저자',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
    tags: {
      description: '태그 목록',
      table: {
        type: { summary: 'array' },
      },
      control: { type: 'object' },
    },
    referenceUrl: {
      description: '링크 URL',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
    className: {
      description: '추가 className (카드 전체)',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
    contentClassName: {
      description: '추가 contentClassName (카드 문구에 적용)',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    content:
      '이 세상에는 위대한 진실이 하나 있어. 무언가를 온 마음을 다해 원한다면, 반드시 그렇게 된다는 거야. 무언가를 바라는 마음은 곧 우주의 마음으로부터 비롯된 것이기 때문이지.',
    author: '파울로 코엘료',
    tags: [
      { id: 1, name: '나아가야할때' },
      { id: 2, name: '꿈을이루고싶을때' },
    ],
    referenceUrl: '/',
    className: undefined,
    contentClassName: undefined,
  },
  parameters: {
    layout: 'centered',
  },
};
