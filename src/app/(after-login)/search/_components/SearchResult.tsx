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
  const { data, fetchNextPage, hasNextPage, isFetching } = useEpigramSearchInfiniteQuery({
    limit: 6,
    keyword,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage, isFetching]);

  const results = data?.pages.flatMap((page) => page.list) ?? [];
  const isShowLoader = isFetching;
  const isShowMoreTrigger = !isFetching && hasNextPage;
  const isShowEmpty = keyword && !results.length && !isFetching;

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
}
