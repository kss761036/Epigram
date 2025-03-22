import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserCommentsById } from '@/apis/user/user.service';
import { PaginationQueryParams } from '@/types/common';

export const useUserCommentsByIdInFiniteQuery = (
  params: Omit<PaginationQueryParams, 'cursor'> & { userId: number },
) => {
  return useInfiniteQuery({
    queryKey: ['userComments', params],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getUserCommentsById(params.userId, { ...params, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });
};
