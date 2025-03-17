'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/helper';
import Button from './Button';
import Image from 'next/image';
import noticeIcon from '@/assets/img/notice.png';

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
  className,
}: DeleteModalProps) {
  const [mounted, setMounted] = useState(false);
  const portalRoot =
    typeof document !== 'undefined' ? document.getElementById('portal-root') : null;

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !portalRoot) return null;

  return createPortal(
    isOpen ? (
      <div
        className={cn('fixed inset-0 flex items-center justify-center bg-black/60', className)}
        onClick={onClose}
        data-testid='modal-overlay'
      >
        <div
          className='w-full max-w-[320px] rounded-3xl bg-white px-4 py-6 md:max-w-[372px] md:px-[38px] md:py-8 lg:max-w-[452px] lg:py-10'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex justify-center'>
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
              className='text-black-700 bg-blue-200 font-medium hover:bg-blue-200 focus:ring-0 focus:ring-offset-0 active:border-blue-200 active:bg-blue-200'
            >
              취소
            </Button>
            <Button
              onClick={onDelete}
              className='bg-blue-900 hover:bg-blue-950 active:bg-blue-950'
              disabled={isSubmitting}
            >
              삭제하기
            </Button>
          </div>
        </div>
      </div>
    ) : null,
    portalRoot,
  );
}
