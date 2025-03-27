'use client';

import { Epigram } from '@/apis/epigram/epigram.type';
import CommentList from '../../mypage/_components/CommentList';
import { useFeedCommentsInFiniteQuery } from '@/apis/epigram/epigram.queries';
import { useState } from 'react';
import { toast } from 'react-toastify';
import CommentForm from '@/components/CommentForm';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { createEpigramComment } from '@/apis/comment/comment.queries';

interface EpigramCommentslProps {
  id: Epigram['id'];
}

export default function EpigramComments({ id }: EpigramCommentslProps) {
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
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

  const handleCreateComment = async () => {
    const trimmed = content.trim();
    if (!trimmed) {
      toast.error('댓글을 입력해주세요');
      return;
    }
    if (trimmed.length > 100) {
      toast.error('100자 이내로 작성해주세요');
      return;
    }

    try {
      await createEpigramComment(id, trimmed, isPrivate);

      toast.success('댓글이 등록되었습니다');

      setContent('');
      setIsPrivate(false);

      queryClient.invalidateQueries({ queryKey: ['comments', id, commentQueryParams] });
    } catch (error) {
      toast.error('댓글 등록에 실패했습니다');
    }
  };

  return (
    <>
      <h2 className='mb-4 text-[16px] leading-7 font-semibold md:mb-6 lg:text-[20px]'>
        댓글 ({comments.length})
      </h2>
      <CommentForm
        writer={
          session?.user
            ? { nickname: session.user.nickname, image: session.user.image }
            : { nickname: '', image: '' }
        }
        editedContent={content}
        setEditedContent={setContent}
        isPrivate={isPrivate}
        setIsPrivate={setIsPrivate}
        isUpdatePending={false}
        handleSaveEdit={handleCreateComment}
        handleCancelEdit={() => setContent('')}
        className='border-t-0 px-0 !pt-0'
      />

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
