'use client';

import formatTime from '@/utils/formatTime';
import Avatar from './Avatar';
import { cn } from '@/utils/helper';

interface CommentProps {
  content: string;
  author: {
    image: string;
    nickname: string;
  };
  createdAt: string;
  className?: string;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

export default function Comment({
  content,
  author,
  createdAt,
  className,
  handleEdit,
  handleDelete,
}: CommentProps) {
  return (
    <div
      className={cn(
        'border-line-200 flex items-start border-t px-6 py-4 text-left md:py-6 lg:py-9',
        className,
      )}
    >
      <Avatar src={author.image} alt={author.nickname} />
      <div className='ml-4 flex-1'>
        <div className='flex items-center text-[12px] md:text-[14px] lg:text-[16px]'>
          <div className='text-black-300 leading-normal'>{author.nickname}</div>
          <div className='text-black-300 ml-2 leading-normal'>{formatTime(createdAt)}</div>
          <ul className='ml-auto flex gap-x-4'>
            <li>
              <button
                className='text-black-600 decoration-black-600 cursor-pointer leading-normal underline underline-offset-3'
                onClick={handleEdit}
              >
                수정
              </button>
            </li>
            <li>
              <button
                className='text-red decoration-red cursor-pointer leading-normal underline underline-offset-3'
                onClick={handleDelete}
              >
                삭제
              </button>
            </li>
          </ul>
        </div>
        <div className='text-black-700 mt-2 text-[14px] leading-[1.7] break-keep md:mt-3 md:text-[16px] md:leading-relaxed lg:mt-4 lg:text-[20px]'>
          {content}
        </div>
      </div>
    </div>
  );
}
