'use client';

import React from 'react';
import { useCommentsInfiniteQuery } from '@/apis/comment/comment.queries';
import Comment from '@/components/Comment';
import Spinner from '@/components/Spinner';
import EtcButton from '@/components/EtcButton';
import { cn } from '@/utils/helper';
import { Section } from '@/components/Section';
import Icon from '@/components/Icon';

export default function CommentsSection() {
  const { data, isFetching, hasNextPage, fetchNextPage } = useCommentsInfiniteQuery({
    limit: 3,
  });
  const results = data?.pages.flatMap((page) => page.list) ?? [];

  const isShowLoader = isFetching;
  const isShowMoreTrigger = !isFetching && hasNextPage;
  const isShowEmpty = !results.length && !isFetching;
  const isShowEnd = !isFetching && !hasNextPage;

  return (
    <div className='mt-[72px] mb-[114px] md:mb-[270px] lg:mt-[160px] lg:mb-[119px]'>
      <Section>최신 댓글</Section>
      <ul className={cn('grid gap-6', 'grid-cols-1')}>
        {results.map((comment) => (
          <li key={comment.id}>
            <Comment {...comment} />
          </li>
        ))}
      </ul>

      {isShowEmpty && (
        <div className='flex items-center justify-center p-10 text-blue-400'>댓글이 없습니다.</div>
      )}

      {isShowLoader && (
        <div className='flex flex-col items-center justify-center gap-4 p-4 text-center text-blue-400'>
          <Spinner className='fill-black text-gray-100' />
          댓글을 가져오는 중입니다.
        </div>
      )}

      {isShowMoreTrigger && (
        <div className='mt-[40px] flex items-center justify-center lg:mt-[72px]'>
          <EtcButton size='lg' variant='outlined' onClick={fetchNextPage}>
            <Icon name='plus' /> 최신 댓글 더보기
          </EtcButton>
        </div>
      )}

      {isShowEnd && (
        <div className='flex items-center justify-center p-10 text-blue-400'>
          모든 댓글을 불러왔습니다.
        </div>
      )}
    </div>
  );
}
