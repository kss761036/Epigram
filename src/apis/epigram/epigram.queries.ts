import { useInfiniteQuery } from '@tanstack/react-query';
import { getEpigrams } from './epigram.service';
import { SearchableQueryParams } from '@/types/common';

export const useEpigramSearchInfiniteQuery = (params: Omit<SearchableQueryParams, 'cursor'>) => {
  return useInfiniteQuery({
    queryKey: ['search', params],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getEpigrams({
        ...params,
        cursor: pageParam,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    enabled: !!params.keyword,
  });
};
