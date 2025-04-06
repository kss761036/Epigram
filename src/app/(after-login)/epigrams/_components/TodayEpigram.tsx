'use client';

import { useTodayEpigram } from '@/apis/epigram/epigram.queries';
import Card from '@/components/Card';
import { Section } from '@/components/Section';
import Spinner from '@/components/Spinner';

export default function TodayEpigram() {
  const { data, isLoading, isError } = useTodayEpigram();

  if (isLoading) {
    return (
      <>
        <Section>오늘의 에피그램</Section>
        <div className='flex flex-col items-center justify-center gap-4 p-4 text-center text-blue-400'>
          <Spinner className='fill-black text-gray-100' />
          에피그램을 가져오는 중입니다.
        </div>
      </>
    );
  }

  if (isError || !data) {
    return (
      <>
        <Section>오늘의 에피그램</Section>
        <div className='flex items-center justify-center p-10 text-blue-400'>
          오늘의 에피그램이 없습니다.
        </div>
      </>
    );
  }

  return (
    <>
      <Section>오늘의 에피그램</Section>
      <Card
        id={data.id}
        content={data.content}
        author={data.author}
        likeCount={data.likeCount}
        writerId={data.writerId}
        referenceUrl={data.referenceUrl ?? ''}
        referenceTitle={data.referenceTitle}
        tags={data.tags}
      />
    </>
  );
}
