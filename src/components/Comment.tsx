'use client';

import formatTime from '@/utils/formatTime';
import Avatar from './Avatar';
import { cn } from '@/utils/helper';

interface CommentProps {
  content: string;
  writer: {
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
  writer,
  createdAt,
  className,
  handleEdit,
  handleDelete,
}: CommentProps) {
  const classes = {
    commentWrapper: cn(
      'border-line-200 flex items-start border-t px-6 py-4 text-left md:py-6 lg:py-9',
      className,
    ),
    commentBox: 'ml-4 flex-1',
    commentInfo: 'flex flex-wrap items-center gap-y-1 text-[12px] md:text-[14px] lg:text-[16px]',
    commentInfoText: 'text-black-300 leading-normal',
    commentInfoBtns: 'ml-auto flex gap-x-4',
    commentInfoBtn: 'cursor-pointer leading-normal underline underline-offset-3',
    commentContent:
      'text-black-700 mt-2 text-[14px] leading-[1.7] break-keep md:mt-3 md:text-[16px] md:leading-relaxed lg:mt-4 lg:text-[20px]',
  };

  return (
    <div className={classes.commentWrapper}>
      <Avatar src={writer.image} alt={writer.nickname} />
      <div className={classes.commentBox}>
        <div className={classes.commentInfo}>
          <div className={classes.commentInfoText}>{writer.nickname}</div>
          <div className={cn(classes.commentInfoText, 'ml-2')}>{formatTime(createdAt)}</div>
          <ul className={classes.commentInfoBtns}>
            <li>
              <button
                className={cn(classes.commentInfoBtn, 'text-black-600 decoration-black-600')}
                onClick={handleEdit}
              >
                수정
              </button>
            </li>
            <li>
              <button
                className={cn(classes.commentInfoBtn, 'text-red decoration-red')}
                onClick={handleDelete}
              >
                삭제
              </button>
            </li>
          </ul>
        </div>
        <div className={classes.commentContent}>{content}</div>
      </div>
    </div>
  );
}
