'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useCreateComment } from '@/apis/comment/comment.queries';
import { useFeedCommentsInFiniteQuery } from '@/apis/epigram/epigram.queries';
import { Epigram, commentSchema, CommentFormValues } from '@/apis/epigram/epigram.type';
import CommentForm from '@/components/CommentForm';
import CommentList from '../../mypage/_components/CommentList';
import type { FieldErrors } from 'react-hook-form';

interface EpigramCommentsProps {
  id: Epigram['id'];
}

export default function EpigramComments({ id }: EpigramCommentsProps) {
  const methods = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: '',
      isPrivate: false,
    },
  });

  const queryClient = useQueryClient();
  const commentQueryParams = { limit: 4 };
  const { data: session } = useSession();

  const {
    data: commentData,
    isFetching: isFetchingComments,
    hasNextPage: hasNextCommentPage,
    fetchNextPage: fetchNextCommentPage,
  } = useFeedCommentsInFiniteQuery(id, commentQueryParams);

  const { mutate: createComment, isPending: isCreatePending } = useCreateComment();

  const comments = commentData?.pages.flatMap((page) => page.list) ?? [];

  const totalCount = commentData?.pages[0]?.totalCount ?? 0;

  const handleCreateComment = (data: CommentFormValues) => {
    createComment(
      {
        epigramId: id,
        content: data.content.trim(),
        isPrivate: data.isPrivate,
      },
      {
        onSuccess: () => {
          toast.success('댓글이 생성되었습니다.');
          methods.reset();
          queryClient.invalidateQueries({ queryKey: ['comments'] });
        },
        onError: () => {
          toast.error('댓글 생성에 실패했습니다.');
        },
      },
    );
  };

  const handleCreateError = (errors: FieldErrors<CommentFormValues>) => {
    if (errors.content) {
      toast.error(errors.content.message as string);
    }
  };

  return (
    <>
      <h2 className='mb-4 text-[16px] leading-7 font-semibold md:mb-6 lg:text-[20px]'>
        댓글 ({totalCount})
      </h2>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleCreateComment, handleCreateError)}
          className='border-t-0 px-0 !pt-0'
        >
          <CommentForm
            writer={
              session?.user
                ? { nickname: session.user.nickname, image: session.user.image }
                : { nickname: '', image: '' }
            }
            isUpdatePending={isCreatePending}
            handleSaveEdit={() => {}}
            handleCancelEdit={() => methods.reset()}
          />
        </form>
      </FormProvider>

      <CommentList
        comments={comments}
        isFetching={isFetchingComments}
        hasNextPage={hasNextCommentPage}
        fetchNextPage={fetchNextCommentPage}
        buttonText='댓글 더보기'
      />
    </>
  );
}
