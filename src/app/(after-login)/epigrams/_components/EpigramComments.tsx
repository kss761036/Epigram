'use client';

import { Epigram, commentSchema, CommentFormValues } from '@/apis/epigram/epigram.type';
import CommentList from '../../mypage/_components/CommentList';
import { useFeedCommentsInFiniteQuery } from '@/apis/epigram/epigram.queries';
import { toast } from 'react-toastify';
import CommentForm from '@/components/CommentForm';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { createEpigramComment } from '@/apis/comment/comment.queries';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldErrors } from 'react-hook-form';

interface EpigramCommentslProps {
  id: Epigram['id'];
}

export default function EpigramComments({ id }: EpigramCommentslProps) {
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

  const comments = commentData?.pages.flatMap((page) => page.list) ?? [];

  const handleCreateComment = async (data: CommentFormValues) => {
    try {
      await createEpigramComment(id, data.content.trim(), data.isPrivate);
      toast.success('댓글이 등록되었습니다');
      methods.reset();
      queryClient.invalidateQueries({ queryKey: ['comments', id, commentQueryParams] });
    } catch (error) {
      toast.error('댓글 등록에 실패했습니다');
    }
  };

  const handleCreateError = (errors: FieldErrors<CommentFormValues>) => {
    if (errors.content) {
      toast.error(errors.content.message as string);
    }
  };

  return (
    <>
      <h2 className='mb-4 text-[16px] leading-7 font-semibold md:mb-6 lg:text-[20px]'>
        댓글 ({comments.length})
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
            isUpdatePending={false}
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
