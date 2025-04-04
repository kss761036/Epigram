'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  useCommentsInfiniteQuery,
  useDeleteComment,
  useUpdateComment,
} from '@/apis/comment/comment.queries';
import type { Comment as CommentType } from '@/apis/comment/comment.type';
import { commentSchema, CommentFormValues } from '@/apis/epigram/epigram.type';
import Comment from '@/components/Comment';
import CommentForm from '@/components/CommentForm';
import DeleteModal from '@/components/DeleteModal';
import EtcButton from '@/components/EtcButton';
import Icon from '@/components/Icon';
import { Section } from '@/components/Section';
import Spinner from '@/components/Spinner';
import { cn } from '@/utils/helper';

export default function RecentComment() {
  const queryClient = useQueryClient();
  const { data, isFetching, hasNextPage, fetchNextPage } = useCommentsInfiniteQuery(3, 4);
  const { data: session } = useSession();

  const comments = data?.pages.flatMap((page) => page.list) ?? [];

  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

  const { mutate: updateComment, isPending: isUpdatePending } = useUpdateComment();
  const { mutate: deleteComment, isPending: isDeletePending } = useDeleteComment();

  const methods = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: '',
      isPrivate: false,
    },
  });

  const handleEdit = (comment: CommentType) => {
    setEditCommentId(comment.id);
    methods.reset({
      content: comment.content,
      isPrivate: comment.isPrivate,
    });
  };

  const handleSaveEdit = () => {
    const data = methods.getValues();
    const trimmed = data.content.trim();

    if (!editCommentId || !trimmed) {
      toast.error('댓글을 입력해주세요');
      return;
    }

    updateComment(
      {
        commentId: editCommentId,
        data: { content: trimmed, isPrivate: data.isPrivate },
      },
      {
        onSuccess: () => {
          toast.success('댓글이 수정되었습니다.');
          setEditCommentId(null);
          queryClient.invalidateQueries({ queryKey: ['comments'] });
        },
        onError: () => {
          toast.error('댓글 수정에 실패했습니다.');
        },
      },
    );
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
  };

  const handleDeleteConfirm = (commentId: number) => {
    setSelectedCommentId(commentId);
  };

  const handleDelete = () => {
    if (!selectedCommentId) return;
    deleteComment(selectedCommentId, {
      onSuccess: () => {
        toast.success('댓글이 삭제되었습니다.');
        setSelectedCommentId(null);
        queryClient.invalidateQueries({ queryKey: ['comments'] });
      },
      onError: () => {
        toast.error('댓글 삭제에 실패했습니다.');
      },
    });
  };

  const isShowLoader = isFetching;
  const isShowMoreTrigger = !isFetching && hasNextPage;
  const isShowEmpty = !comments.length && !isFetching;
  const isShowEnd = !isFetching && !hasNextPage;

  return (
    <div className='mt-[72px] mb-[114px] md:mb-[270px] lg:mt-[160px] lg:mb-[119px]'>
      <Section>최신 댓글</Section>
      <ul className={cn('grid gap-6', 'grid-cols-1')}>
        {comments.map((comment) => {
          const isOwnComment = session?.user.id === comment.writer.id;
          return (
            <li key={comment.id}>
              {editCommentId === comment.id ? (
                <FormProvider {...methods}>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <CommentForm
                      comment={comment}
                      isUpdatePending={isUpdatePending}
                      handleSaveEdit={handleSaveEdit}
                      handleCancelEdit={handleCancelEdit}
                    />
                  </form>
                </FormProvider>
              ) : (
                <Comment
                  {...comment}
                  isOwnComment={isOwnComment}
                  handleEdit={() => isOwnComment && handleEdit(comment)}
                  handleDelete={() => isOwnComment && handleDeleteConfirm(comment.id)}
                />
              )}
            </li>
          );
        })}
      </ul>

      {isShowEmpty && (
        <div className='flex items-center justify-center p-10 text-blue-400'>댓글이 없습니다.</div>
      )}

      {isShowLoader && (
        <div className='flex flex-col items-center justify-center gap-4 p-4 text-center text-blue-400'>
          <Spinner className='fill-black text-gray-100' />
          댓글을 가져오는 중입니다.
        </div>
      )}

      {isShowMoreTrigger && (
        <div className='mt-[40px] flex items-center justify-center lg:mt-[72px]'>
          <EtcButton size='lg' variant='outlined' onClick={fetchNextPage}>
            <Icon name='plus' /> 최신 댓글 더보기
          </EtcButton>
        </div>
      )}

      {isShowEnd && (
        <div className='flex items-center justify-center p-10 text-blue-400'>
          모든 댓글을 불러왔습니다.
        </div>
      )}

      <DeleteModal
        isOpen={selectedCommentId !== null}
        type='comment'
        onClose={() => setSelectedCommentId(null)}
        onDelete={handleDelete}
        isSubmitting={isDeletePending}
      />
    </div>
  );
}
