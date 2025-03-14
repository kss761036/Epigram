import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SearchCard from './SearchCard';

const meta: Meta<typeof SearchCard> = {
  component: SearchCard,
  title: 'Components/SearchCard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '검색된 Card 결과 컴포넌트',
      },
    },
  },
  argTypes: {
    keyword: {
      description: '검색 키워드 (빈칸 포함 가능)',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
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
type Story = StoryObj<typeof SearchCard>;

export const Default: Story = {
  args: {
    keyword: '우울',
    content: '우울증이란 우리를 내적인 나락으로 이끄는 유혹의 손길이다.',
    author: '클라우스 랑에',
    tags: [
      { id: 1, name: '짧은명언' },
      { id: 2, name: '우울증' },
    ],
    referenceUrl: '/',
    className: undefined,
    contentClassName: undefined,
  },
  parameters: {
    layout: 'centered',
  },
};

export const 검색어의_빈칸_존재: Story = {
  args: {
    keyword: '우 울',
    content:
      '이 세상에는 위대한 진실이 하나 있어. 무언가를 온 마음을 다해 원한다면, 반드시 그렇게 된다는 거야. ',
    author: '파우울로 코엘료',
    tags: [{ id: 1, name: '새로운영감' }],
    referenceUrl: '/',
    className: undefined,
    contentClassName: undefined,
  },
  parameters: {
    layout: 'centered',
  },
};

export const 내용의_빈칸_포함: Story = {
  args: {
    keyword: '우울',
    content: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.',
    author: '앙드우 울로',
    tags: [
      { id: 1, name: '동기부여' },
      { id: 2, name: '우울할때' },
      { id: 3, name: '나아가야할때' },
    ],
    referenceUrl: '/',
    className: undefined,
    contentClassName: undefined,
  },
  parameters: {
    layout: 'centered',
  },
};
