import { useInfiniteQuery } from '@tanstack/react-query';
import { getEpigrams, getEpigramsByUserId } from './epigram.service';
import {
  PaginationQueryParams,
  SearchableQueryParams,
  WriterFilterQueryParams,
} from '@/types/common';

export const useEpigramSearchInfiniteQuery = (params: Omit<SearchableQueryParams, 'cursor'>) => {
  return useInfiniteQuery({
    queryKey: ['epigrams', 'search', params],
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
    queryKey: ['epigrams', params],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getEpigrams({ ...params, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });
};

export const useEpigramWriterFilterInfiniteQuery = (
  params: Omit<WriterFilterQueryParams, 'cursor'>,
) => {
  return useInfiniteQuery({
    queryKey: ['epigrams', 'writerFilter', params],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getEpigramsByUserId({
        ...params,
        cursor: pageParam,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });
};
