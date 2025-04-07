'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Epigram } from '@/apis/epigram/epigram.type';
import formatTime from '@/utils/formatTime';
import { cn } from '@/utils/helper';
import Avatar from './Avatar';
import ProfileModal from './ProfileModal';

interface CommentProps {
  epigramId: Epigram['id'];
  content: string;
  writer: {
    image: string;
    nickname: string;
  };
  updatedAt: string;
  className?: string;
  handleEdit?: () => void;
  handleDelete?: () => void;
  isOwnComment?: boolean;
  href?: string;
}

export default function Comment({
  epigramId,
  content,
  writer,
  updatedAt,
  className,
  handleEdit,
  handleDelete,
  isOwnComment = true,
  href,
}: CommentProps) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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

  const CommentBody = () => (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsProfileModalOpen(true);
        }}
        className='cursor-pointer'
      >
        <Avatar src={writer.image} alt={writer.nickname} />
      </div>
      <div className={classes.commentBox}>
        <div className={classes.commentInfo}>
          <div className={classes.commentInfoText}>{writer.nickname}</div>
          <div className={cn(classes.commentInfoText, 'ml-2')}>{formatTime(updatedAt)}</div>
          {isOwnComment && (
            <ul className={classes.commentInfoBtns}>
              <li>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit?.();
                  }}
                  className={cn(classes.commentInfoBtn, 'text-black-600 decoration-black-600')}
                >
                  수정
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete?.();
                  }}
                  className={cn(classes.commentInfoBtn, 'text-red decoration-red')}
                >
                  삭제
                </button>
              </li>
            </ul>
          )}
        </div>
        <div className={classes.commentContent}>{content}</div>
      </div>
    </>
  );

  return (
    <>
      {href ? (
        <Link href={href + epigramId} className={classes.commentWrapper}>
          <CommentBody />
        </Link>
      ) : (
        <div className={classes.commentWrapper}>
          <CommentBody />
        </div>
      )}

      <ProfileModal
        isOpen={isProfileModalOpen}
        writer={writer}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
}
