import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getComments, deleteComment, updateComment, createComment } from './comment.service';
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

    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ['userComments'] });

      const previousComments = queryClient.getQueryData<{
        pages: { list: Comment[]; nextCursor?: number }[];
      }>(['userComments']);

      queryClient.setQueryData<{ pages: { list: Comment[]; nextCursor?: number }[] }>(
        ['userComments'],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              list: page.list.filter((comment) => comment.id !== commentId),
            })),
          };
        },
      );

      return { previousComments };
    },

    onError: (_, __, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(['userComments'], context.previousComments);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userComments'] });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, data }: { commentId: number; data: UpdateCommentFormType }) =>
      updateComment(commentId, data),

    onMutate: async ({ commentId, data }) => {
      await queryClient.cancelQueries({ queryKey: ['userComments'] });

      const previousComments = queryClient.getQueryData<{
        pages: { list: Comment[]; nextCursor?: number }[];
      }>(['userComments']);

      queryClient.setQueryData<{ pages: { list: Comment[]; nextCursor?: number }[] }>(
        ['userComments'],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              list: page.list.map((comment) =>
                comment.id === commentId ? { ...comment, ...data } : comment,
              ),
            })),
          };
        },
      );

      return { previousComments };
    },

    onError: (_, __, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(['userComments'], context.previousComments);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userComments'] });
    },
  });
};

export const createEpigramComment = (epigramId: number, content: string, isPrivate: boolean) => {
  return createComment({ epigramId, content, isPrivate });
};
