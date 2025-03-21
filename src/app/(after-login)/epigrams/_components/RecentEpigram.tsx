'use client';

import { useEpigramInfiniteQuery } from '@/apis/epigram/epigram.queries';
import { cn } from '@/utils/helper';
import Card from '@/components/Card';
import EtcButton from '@/components/EtcButton';
import Icon from '@/components/Icon';
import { Section, SectionTitle } from '@/components/Section';
import Spinner from '@/components/Spinner';

export default function LatestEpigrams() {
  const { data, isFetching, hasNextPage, fetchNextPage } = useEpigramInfiniteQuery({ limit: 5 });
  const results =
    data?.pages.flatMap((page, index) => (index === 0 ? page.list.slice(0, 3) : page.list)) ?? [];

  const isShowLoader = isFetching;
  const isShowMoreTrigger = !isFetching && hasNextPage;
  const isShowEmpty = !results.length && !isFetching;
  const isShowEnd = !isFetching && !hasNextPage;

  return (
    <div className='mt-[56px] lg:mt-[140px]'>
      <Section>
        <SectionTitle>최신 에피그램</SectionTitle>
      </Section>
      <div className='mb-10 md:mb-14 lg:mb-18'>
        <ul className={cn('grid grid-cols-1 gap-6')}>
          {results.map((feed) => (
            <li key={feed.id}>
              <Card {...feed} />
            </li>
          ))}
        </ul>

        {isShowEmpty && (
          <div className='flex items-center justify-center p-10 text-blue-400'>
            작성된 에피그램이 없습니다.
          </div>
        )}

        {isShowLoader && (
          <div className='flex flex-col items-center justify-center gap-4 p-4 text-center text-blue-400'>
            <Spinner className='fill-black text-gray-100' />
            에피그램을 가져오는 중입니다.
          </div>
        )}

        {isShowEnd && (
          <div className='flex items-center justify-center p-10 text-blue-400'>
            모든 에피그램을 불러왔습니다.
          </div>
        )}
      </div>

      {isShowMoreTrigger && (
        <div className='flex justify-center'>
          <EtcButton size='lg' variant='outlined' onClick={fetchNextPage}>
            <Icon name='plus' /> 에피그램 더보기
          </EtcButton>
        </div>
      )}
    </div>
  );
}
