'use client';

import { Epigram } from '@/apis/epigram/epigram.type';
import MyComments from '../../mypage/_components/MyComments';
import { useFeedCommentsInFiniteQuery } from '@/apis/epigram/epigram.queries';
import { getUser } from '@/apis/user/user.service';
import { useEffect, useState } from 'react';
import { User } from '@/apis/user/user.type';
import { DetailLoading } from './detail';
import { toast } from 'react-toastify';
import { createComment } from '@/apis/comment/comment.service';
import CommentEditForm from '@/components/CommentEditForm';
import { useQueryClient } from '@tanstack/react-query';

interface EpigramCommentslProps {
  id: Epigram['id'];
}

export default function EpigramComments({ id }: EpigramCommentslProps) {
  const [userData, setUserData] = useState<User | null>(null);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const queryClient = useQueryClient();
  const commentQueryParams = { limit: 4 };

  const {
    data: commentData,
    isFetching: isFetchingComments,
    hasNextPage: hasNextCommentPage,
    fetchNextPage: fetchNextCommentPage,
  } = useFeedCommentsInFiniteQuery(id, commentQueryParams);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      setUserData(data);
    };
    fetchUser();
  }, []);

  if (!userData) return <DetailLoading />;

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
      await createComment({
        epigramId: id,
        content: trimmed,
        isPrivate,
      });

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
      <CommentEditForm
        writer={{ ...userData, image: userData.image ?? '' }}
        editedContent={content}
        setEditedContent={setContent}
        isPrivate={isPrivate}
        setIsPrivate={setIsPrivate}
        isUpdatePending={false}
        handleSaveEdit={handleCreateComment}
        handleCancelEdit={() => setContent('')}
        className='border-t-0 px-0 !pt-0'
      />

      <MyComments
        comments={comments}
        isFetching={isFetchingComments}
        hasNextPage={hasNextCommentPage}
        fetchNextPage={fetchNextCommentPage}
        buttonText='댓글 더보기'
      />
    </>
  );
}
