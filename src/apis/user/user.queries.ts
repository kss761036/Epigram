import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getUserById, getUserCommentsById } from '@/apis/user/user.service';
import { PaginationQueryParams } from '@/types/common';

export const useUserCommentsByIdInFiniteQuery = (
  params: Omit<PaginationQueryParams, 'cursor'> & { userId: number },
) => {
  return useInfiniteQuery({
    queryKey: ['comments', 'user', params.userId, params],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getUserCommentsById(params.userId, { ...params, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });
};

export const useUserByNicknameQuery = (params: { userId: number }) => {
  return useQuery({
    queryKey: ['user', params.userId],
    queryFn: () => getUserById(params.userId),
    enabled: !!params.userId,
  });
};
