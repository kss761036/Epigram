'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useDeleteComment } from '@/apis/comment/comment.queries';
import { useUpdateComment } from '@/apis/comment/comment.queries';
import type { Comment as CommentType } from '@/apis/comment/comment.type';
import Comment from '@/components/Comment';
import Spinner from '@/components/Spinner';
import EtcButton from '@/components/EtcButton';
import Icon from '@/components/Icon';
import DeleteModal from '@/components/DeleteModal';
import CommentForm from '@/components/CommentForm';
import Image from 'next/image';
import emptyImg from '@/assets/img/empty.png';
import { useQueryClient } from '@tanstack/react-query';

interface CommentListProps {
  comments: CommentType[];
  isFetching: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  buttonText?: string;
}

export default function CommentList({
  comments,
  isFetching,
  hasNextPage,
  fetchNextPage,
  buttonText = '내 댓글 더보기',
}: CommentListProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { mutate: updateComment, isPending: isUpdatePending } = useUpdateComment();
  const { mutate: deleteComment, isPending: isDeletePending } = useDeleteComment();

  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const handleEdit = (comment: CommentType) => {
    setEditCommentId(comment.id);
    setEditedContent(comment.content);
    setIsPrivate(comment.isPrivate);
  };

  const handleSaveEdit = () => {
    const trimmedContent = editedContent.trim();

    if (!editCommentId || !trimmedContent) {
      toast.error('댓글을 입력해주세요');
      return;
    }

    if (trimmedContent.length > 100) {
      toast.error('100자 이내로 작성해주세요');
      return;
    }

    updateComment(
      { commentId: editCommentId, data: { content: trimmedContent, isPrivate } },
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
  const isShowEnd = !isFetching && !hasNextPage && !isShowEmpty;

  return (
    <>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {editCommentId === comment.id ? (
              <CommentForm
                comment={comment}
                editedContent={editedContent}
                setEditedContent={setEditedContent}
                isPrivate={isPrivate}
                setIsPrivate={setIsPrivate}
                isUpdatePending={isUpdatePending}
                handleSaveEdit={handleSaveEdit}
                handleCancelEdit={handleCancelEdit}
              />
            ) : (
              <Comment
                {...comment}
                handleEdit={() => handleEdit(comment)}
                handleDelete={() => handleDeleteConfirm(comment.id)}
                isOwnComment={comment.writer.id === session?.user.id}
              />
            )}
          </li>
        ))}
      </ul>

      {isShowEmpty && (
        <div className='flex flex-col items-center justify-center'>
          <Image
            src={emptyImg}
            alt='아직 작성한 댓글이 없음을 나타내는 이미지'
            width={200}
            height={200}
            className='mt-[38px] h-24 w-24 lg:mt-[76px] lg:h-36 lg:w-36'
          />
          <span className='text-black-600 text-md mt-2 mb-8 text-center md:mt-4 md:mb-10 lg:mt-6 lg:mb-12 lg:text-xl'>
            아직 작성한 댓글이 없어요!
            <br />
            댓글을 달고 다른 사람들과 교류해 보세요.
          </span>
          <EtcButton
            variant='outlined'
            onClick={() => router.push('/feeds')}
            size='lg'
            className='text-black-400 border-gray-100 font-medium md:text-[14px] lg:text-[20px]'
          >
            에피그램 둘러보기
          </EtcButton>
        </div>
      )}

      {isShowLoader && (
        <div className='flex flex-col items-center justify-center gap-4 p-4 text-center text-blue-400'>
          <Spinner className='fill-black text-gray-100' />
          댓글을 불러오는 중입니다.
        </div>
      )}

      {isShowEnd && (
        <div className='flex items-center justify-center p-10 text-gray-500'>
          모든 댓글을 불러왔습니다.
        </div>
      )}

      {isShowMoreTrigger && (
        <div className='flex items-center justify-center p-4'>
          <EtcButton variant='outlined' onClick={fetchNextPage} size='lg'>
            <Icon name='plus' /> {buttonText}
          </EtcButton>
        </div>
      )}

      <DeleteModal
        isOpen={selectedCommentId !== null}
        type='comment'
        onClose={() => setSelectedCommentId(null)}
        onDelete={handleDelete}
        isSubmitting={isDeletePending}
      />
    </>
  );
}
