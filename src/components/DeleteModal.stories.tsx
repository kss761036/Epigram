import { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import DeleteModal from './DeleteModal';

const meta: Meta<typeof DeleteModal> = {
  component: DeleteModal,
  title: 'Components/DeleteModal',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '삭제 확인 모달 컴포넌트입니다. 댓글 또는 게시물을 삭제할 때 사용됩니다.',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 표시 여부',
    },
    type: {
      control: 'radio',
      options: ['comment', 'post'],
      description: '삭제할 항목 유형 (댓글 or 게시물)',
    },
    isSubmitting: {
      control: 'boolean',
      description: '삭제 버튼 비활성화 상태',
    },
    className: { control: 'text' },
    onClose: { action: 'onClose' },
    onDelete: { action: 'onDelete' },
  },
};

export default meta;
type Story = StoryObj<typeof DeleteModal>;

export const Default: Story = {
  args: {
    isOpen: false,
    type: 'comment',
    isSubmitting: false,
  },
  render: function Render(args) {
    const [{ isOpen }, updateArgs] = useArgs();

    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => updateArgs({ isOpen: false });

    return (
      <div className='flex h-[200px] items-center justify-center'>
        <button
          className='cursor-pointer rounded-lg bg-blue-900 px-4 py-2 font-medium text-white'
          onClick={handleOpen}
        >
          Open Modal
        </button>
        <DeleteModal {...args} isOpen={isOpen} onClose={handleClose} />
      </div>
    );
  },
};

export const CommentDelete: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
      let portalRoot = document.getElementById('portal-root');
      if (!portalRoot) {
        portalRoot = document.createElement('div');
        portalRoot.id = 'portal-root';
        document.body.appendChild(portalRoot);
      }
    }, []);

    const handleDelete = () => {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsOpen(false);
      }, 1500);
    };

    return (
      <div className='flex h-[200px] items-center justify-center'>
        <button
          className='cursor-pointer rounded-lg bg-blue-900 px-4 py-2 font-medium text-white'
          onClick={() => setIsOpen(true)}
        >
          댓글 삭제
        </button>
        <DeleteModal
          isOpen={isOpen}
          type='comment'
          onClose={() => setIsOpen(false)}
          onDelete={handleDelete}
          isSubmitting={isSubmitting}
        />
      </div>
    );
  },
  parameters: {
    layout: 'centered',
  },
};

export const PostDelete: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
      let portalRoot = document.getElementById('portal-root');
      if (!portalRoot) {
        portalRoot = document.createElement('div');
        portalRoot.id = 'portal-root';
        document.body.appendChild(portalRoot);
      }
    }, []);

    const handleDelete = () => {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsOpen(false);
      }, 1500);
    };

    return (
      <div className='flex h-[200px] items-center justify-center'>
        <button
          className='cursor-pointer rounded-lg bg-blue-900 px-4 py-2 font-medium text-white'
          onClick={() => setIsOpen(true)}
        >
          게시물 삭제
        </button>
        <DeleteModal
          isOpen={isOpen}
          type='post'
          onClose={() => setIsOpen(false)}
          onDelete={handleDelete}
          isSubmitting={isSubmitting}
        />
      </div>
    );
  },
  parameters: {
    layout: 'centered',
  },
};
