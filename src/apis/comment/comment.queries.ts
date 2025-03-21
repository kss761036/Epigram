import { useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from './comment.service';
import { PaginationQueryParams } from '@/types/common';

export const useCommentsInfiniteQuery = (params: Omit<PaginationQueryParams, 'cursor'>) => {
  return useInfiniteQuery({
    queryKey: ['comments', params],
    queryFn: ({ pageParam }: { pageParam?: number }) =>
      getComments({ ...params, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });
};
