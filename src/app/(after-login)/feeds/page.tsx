'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEpigramInfiniteQuery } from '@/apis/epigram/epigram.queries';
import Card from '@/components/Card';
import EtcButton from '@/components/EtcButton';
import Icon from '@/components/Icon';
import { Section, SectionTitle, SectionUtil } from '@/components/Section';
import Spinner from '@/components/Spinner';
import { useFeedsListTypeStore } from '@/store/feedsListTypeStore';
import { cn } from '@/utils/helper';
import FloatingButtons from '../_components/FloatingButtons';

export default function FeedPage() {
  const { data, isFetching, hasNextPage, fetchNextPage, error } = useEpigramInfiniteQuery({
    limit: 6,
  });
  const { listType, toggle: toggleList } = useFeedsListTypeStore();
  const results = data?.pages.flatMap((page) => page.list) ?? [];

  if (error) {
    throw new Error('피드를 가져오는중 문제가 발생했습니다.');
  }

  const isShowLoader = isFetching;
  const isShowMoreTrigger = !isFetching && hasNextPage;
  const isShowEmpty = !results.length && !isFetching;
  const isShowEnd = !isFetching && !hasNextPage;

  const renderContent = () => {
    if (isShowEmpty) {
      return (
        <div className='flex items-center justify-center p-10 text-blue-400'>
          작성된 에피그램이 없습니다.
        </div>
      );
    }

    return (
      <>
        <div className='mb-50 md:mb-14'>
          <ul
            className={cn(
              'grid grid-cols-2 items-start gap-6 md:grid-cols-2 md:gap-8',
              listType === 'list' && 'grid-cols-1',
            )}
          >
            <AnimatePresence>
              {results.map((feed) => (
                <motion.li
                  layout
                  key={feed.id}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Card {...feed} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        {isShowLoader && (
          <div className='flex flex-col items-center justify-center gap-4 p-4 text-center text-blue-400'>
            <Spinner className='fill-black text-gray-100' />
            에피그램을 가져오는 중입니다.
          </div>
        )}

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

        {isShowEnd && (
          <div className='flex items-center justify-center p-10 text-blue-400'>
            모든 에피그램을 불러왔습니다.
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className='bg-bg min-h-dvh py-8'>
        <div className='mx-auto px-6 md:px-19 lg:max-w-7xl'>
          <Section>
            <SectionTitle>피드</SectionTitle>
            <SectionUtil>
              <button
                className='cursor-pointer text-gray-200 transition-colors hover:text-gray-800 md:hidden'
                onClick={toggleList}
              >
                {listType === 'list' ? <Icon name='dashboard' /> : <Icon name='filter' />}
              </button>
            </SectionUtil>
          </Section>
          {renderContent()}
        </div>
      </div>
      <FloatingButtons />
    </>
  );
}
