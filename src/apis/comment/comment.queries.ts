import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getComments, deleteComment, updateComment, createComment } from './comment.service';
import { Comment, UpdateCommentFormType } from './comment.type';

export const useCommentsInfiniteQuery = (initialLimit: number, fetchLimit: number) => {
  return useInfiniteQuery({
    queryKey: ['comments', { initialLimit, fetchLimit }],
    queryFn: ({ pageParam = 0 }) => {
      const limit = pageParam === 0 ? initialLimit : fetchLimit;
      return getComments({ cursor: pageParam, limit });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: Comment['id']) => deleteComment(commentId),

    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ['comments', 'user'] });

      const previousComments = queryClient.getQueryData<{
        pages: { list: Comment[]; nextCursor?: number }[];
      }>(['comments', 'user']);

      queryClient.setQueryData<{ pages: { list: Comment[]; nextCursor?: number }[] }>(
        ['comments', 'user'],
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
        queryClient.setQueryData(['comments', 'user'], context.previousComments);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', 'user'] });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, data }: { commentId: number; data: UpdateCommentFormType }) =>
      updateComment(commentId, data),

    onMutate: async ({ commentId, data }) => {
      await queryClient.cancelQueries({ queryKey: ['comments', 'user'] });

      const previousComments = queryClient.getQueryData<{
        pages: { list: Comment[]; nextCursor?: number }[];
      }>(['comments', 'user']);

      queryClient.setQueryData<{ pages: { list: Comment[]; nextCursor?: number }[] }>(
        ['comments', 'user'],
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
        queryClient.setQueryData(['comments', 'user'], context.previousComments);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', 'user'] });
    },
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      epigramId,
      content,
      isPrivate,
    }: {
      epigramId: number;
      content: string;
      isPrivate: boolean;
    }) => createComment({ epigramId, content, isPrivate }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', 'user'] });
    },

    onError: (error) => {
      console.error('댓글 생성 실패:', error);
    },
  });
};
