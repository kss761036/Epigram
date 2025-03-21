'use client';

import { cn } from '@/utils/helper';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useEpigramInfiniteQuery } from '@/apis/epigram/epigram.queries';
import Card from '@/components/Card';
import EtcButton from '@/components/EtcButton';
import Icon from '@/components/Icon';
import { Section, SectionTitle, SectionUtil } from '@/components/Section';
import Spinner from '@/components/Spinner';

export default function FeedPage() {
  const { data, isFetching, hasNextPage, fetchNextPage } = useEpigramInfiniteQuery({ limit: 6 });
  const [isListMode, setIsListMode] = useLocalStorage<boolean>('isListMode', false);

  const results = data?.pages.flatMap((page) => page.list) ?? [];

  const isShowLoader = isFetching;
  const isShowMoreTrigger = !isFetching && hasNextPage;
  const isShowEmpty = !results.length && !isFetching;
  const isShowEnd = !isFetching && !hasNextPage;

  return (
    <div className='bg-bg min-h-dvh py-8'>
      <div className='mx-auto px-6 md:px-19 lg:max-w-7xl'>
        <Section>
          <SectionTitle>피드</SectionTitle>
          <SectionUtil>
            <button className='md:hidden' onClick={() => setIsListMode((prev) => !prev)}>
              {isListMode ? (
                <Icon name='dashboard' className='text-gray-200' />
              ) : (
                <Icon name='filter' className='text-gray-200' />
              )}
            </button>
          </SectionUtil>
        </Section>
        <div className='mb-50 md:mb-14'>
          <ul
            className={cn(
              'grid grid-cols-2 gap-6 md:grid-cols-2 md:gap-8',
              isListMode && 'grid-cols-1',
            )}
          >
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
          <div className='pointer-events-none fixed bottom-0 left-0 z-10 w-full md:relative md:bottom-auto md:left-auto'>
            <div className='from-bg to-bg/10 h-20 bg-gradient-to-t md:hidden'></div>
            <div className='bg-bg pointer-events-auto flex items-center justify-center pb-15'>
              <EtcButton size='lg' variant='outlined' onClick={fetchNextPage}>
                <Icon name='plus' /> 에피그램 더보기
              </EtcButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
