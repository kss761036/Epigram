'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useEpigramSearchInfiniteQuery } from '@/apis/epigram/epigram.queries';
import SearchCard from '@/components/SearchCard';
import Spinner from '@/components/Spinner';

interface SearchResultProps {
  keyword?: string;
}

export default function SearchResult({ keyword }: SearchResultProps) {
  const [ref, inView] = useInView();
  const { data, fetchNextPage, hasNextPage, isFetching, error } = useEpigramSearchInfiniteQuery({
    limit: 6,
    keyword,
  });
  const results = data?.pages.flatMap((page) => page.list) ?? [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage, isFetching]);

  if (error) {
    throw new Error('검색결과를 가져오는중 문제가 발생했습니다.');
  }

  const isShowLoader = isFetching;
  const isShowMoreTrigger = !isFetching && hasNextPage;
  const isShowEmpty = keyword && !results.length && !isFetching;

  const renderContent = () => {
    if (isShowEmpty) {
      return <div className='p-4 text-center text-blue-400'>검색결과가 없습니다.</div>;
    }

    return (
      <>
        <ul>
          {results.map((item) => (
            <li key={item.id}>
              <SearchCard {...item} keyword={keyword} />
            </li>
          ))}
        </ul>

        {isShowLoader && (
          <div className='flex flex-col items-center justify-center gap-4 p-4 text-center text-blue-400'>
            <Spinner className='fill-black text-gray-100' />
            검색중입니다.
          </div>
        )}

        {isShowMoreTrigger && <div ref={ref}></div>}
      </>
    );
  };

  return <div className='py-4'>{renderContent()}</div>;
}
