import { Meta, StoryObj } from '@storybook/react';
import Comment from './Comment';

const meta: Meta<typeof Comment> = {
  component: Comment,
  title: 'Components/Comment',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '댓글 컴포넌트',
      },
    },
  },

  argTypes: {
    content: {
      description: '댓글 내용',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },

    writer: {
      description: '댓글 작성자 정보 (프로필이미지, 닉네임)',
      table: {
        type: { summary: 'object' },
      },
      control: 'object',
    },

    updatedAt: {
      description: '작성일과 현재 시간의 차이',
      table: {
        type: { summary: 'date' },
      },
      control: 'date',
    },

    className: {
      description: '추가 className',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },

    handleEdit: {
      description: '수정 버튼 클릭 시 이벤트',
      table: {
        type: { summary: 'function' },
      },
      action: 'handleEdit',
    },

    handleDelete: {
      description: '삭제 버튼 클릭 시 이벤트',
      table: {
        type: { summary: 'function' },
      },
      action: 'handleDelete',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {
  args: {
    content:
      '이 세상에는 위대한 진실이 하나 있어. 무언가를 온 마음을 다해 원한다면, 반드시 그렇게 된다는 거야. 무언가를 바라는 마음은 곧 우주의 마음으로부터 비롯된 것이기 때문이지.',
    writer: { image: 'https://placehold.co/40x40/000000/FFFFFF.png', nickname: '파울로 코엘료' },
    updatedAt: '2025-03-14T12:04:09.521Z',
    className: '',
    handleEdit: () => alert('수정 버튼 클릭'),
    handleDelete: () => alert('삭제 버튼 클릭'),
  },
  parameters: {
    layout: 'centered',
  },
};

export const 수정삭제버튼_제외: Story = {
  args: {
    content:
      '이 세상에는 위대한 진실이 하나 있어. 무언가를 온 마음을 다해 원한다면, 반드시 그렇게 된다는 거야. 무언가를 바라는 마음은 곧 우주의 마음으로부터 비롯된 것이기 때문이지.',
    writer: { image: 'https://placehold.co/40x40/000000/FFFFFF.png', nickname: '파울로 코엘료' },
    updatedAt: '2025-03-14T12:04:09.521Z',
    className: '',
    isOwnComment: false,
  },
  parameters: {
    layout: 'centered',
  },
};
