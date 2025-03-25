import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getComments, deleteComment, updateComment } from './comment.service';
import { PaginationQueryParams } from '@/types/common';
import { Comment, UpdateCommentFormType } from './comment.type';

export const useCommentsInfiniteQuery = (params: Omit<PaginationQueryParams, 'cursor'>) => {
  return useInfiniteQuery({
    queryKey: ['comments', params],
    queryFn: ({ pageParam }: { pageParam?: number }) =>
      getComments({ ...params, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: Comment['id']) => deleteComment(commentId),
    onSuccess: (_, commentId) => {
      queryClient.invalidateQueries({ queryKey: ['userComments'] });

      queryClient.setQueryData<{
        pages: { list: Comment[]; nextCursor?: number }[];
      }>(['userComments'], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            list: page.list.filter((comment) => comment.id !== commentId),
          })),
        };
      });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, data }: { commentId: number; data: UpdateCommentFormType }) =>
      updateComment(commentId, data),
    onSuccess: (updatedComment) => {
      queryClient.invalidateQueries({ queryKey: ['userComments'] });

      queryClient.setQueryData<{
        pages: { list: Comment[]; nextCursor?: number }[];
      }>(['userComments'], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            list: page.list.map((comment) =>
              comment.id === updatedComment.id ? updatedComment : comment,
            ),
          })),
        };
      });
    },
  });
};
