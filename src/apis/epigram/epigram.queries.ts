import { useInfiniteQuery } from '@tanstack/react-query';
import { getEpigrams } from './epigram.service';
import { PaginationQueryParams, SearchableQueryParams } from '@/types/common';

export const useEpigramSearchInfiniteQuery = (params: Omit<SearchableQueryParams, 'cursor'>) => {
  return useInfiniteQuery({
    queryKey: ['epgigrams', 'search', params],
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

export const useEpigramInfiniteQuery = (params: Omit<PaginationQueryParams, 'cursor'>) => {
  return useInfiniteQuery({
    queryKey: ['epgirams', params],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getEpigrams({ ...params, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });
};
