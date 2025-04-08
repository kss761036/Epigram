'use client';

import Image from 'next/image';
import noticeIcon from '@/assets/img/notice.png';
import Button from './Button';
import ModalBase from './ModalBase';

interface DeleteModalProps {
  isOpen: boolean;
  type: 'comment' | 'post';
  onClose: () => void;
  onDelete: () => void;
  isSubmitting?: boolean;
  className?: string;
}

export default function DeleteModal({
  isOpen,
  type,
  onClose,
  onDelete,
  isSubmitting = false,
}: DeleteModalProps) {
  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      className='px-4 py-6 md:px-[38px] md:py-8'
      titleId='delete-modal-title'
    >
      <div className='flex justify-center'>
        <h2 id='delete-modal-title' className='sr-only'>
          {type === 'comment' ? '댓글 삭제' : '게시물 삭제'}
        </h2>
        <Image
          src={noticeIcon}
          alt='삭제 경고 아이콘'
          width={60}
          height={60}
          className='h-11 w-11 lg:h-14 lg:w-14'
        />
      </div>

      <div className='mt-4 mb-6 flex flex-col gap-2 md:mt-6 md:mb-9 lg:mb-10 lg:gap-4'>
        <p className='text-black-700 text-center text-lg font-semibold md:text-xl lg:text-2xl'>
          {type === 'comment' ? '댓글을 삭제하시겠어요?' : '게시물을 삭제하시겠어요?'}
        </p>

        <p className='text-md lg:text-2lg text-center text-gray-400 md:text-lg'>
          {type === 'comment'
            ? '댓글은 삭제 후 복구할 수 없어요.'
            : '게시물은 삭제 후 복구할 수 없어요.'}
        </p>
      </div>

      <div className='flex flex-row gap-2 lg:gap-4'>
        <Button
          onClick={onClose}
          className='text-black-700 bg-blue-200 font-medium hover:bg-blue-200 active:border-blue-200 active:bg-blue-200'
        >
          취소
        </Button>
        <Button
          onClick={onDelete}
          className='bg-blue-900 hover:bg-blue-950 focus:ring-black active:bg-blue-950'
          disabled={isSubmitting}
        >
          삭제하기
        </Button>
      </div>
    </ModalBase>
  );
}
