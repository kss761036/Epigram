'use client';

import { useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEpigram } from '@/apis/epigram/epigram.queries';
import Inner from '@/components/Inner';
import DeleteModal from '@/components/DeleteModal';
import EpigramComments from '../_components/EpigramComments';
import {
  DeatailFooter,
  DetailContent,
  DetailHeader,
  DetailLoading,
  DetailWrapper,
} from '../_components/detail';

export default function Page() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = useSession();
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);

  const id = Number(params.id);
  const { details, remove, like, disLike } = useEpigram(id);

  if (details.isLoading) return <DetailLoading />;
  if (details.isError) throw new Error('게시물을 가져오지 못했습니다.');
  if (!details.data) return notFound();

  const { tags, content, author, writerId, referenceTitle, referenceUrl, likeCount, isLiked } =
    details.data;
  const isOwner = writerId === session?.user.id;

  const handleEdit = () => {
    if (!isOwner) {
      return alert('작성자만 수정이 가능합니다.');
    }

    router.push(`/epigrams/${id}/edit`);
  };

  const handleRemove = () => {
    if (!isOwner) {
      return alert('작성자만 삭제가 가능합니다.');
    }

    remove.mutate();
  };

  const handleRemoveConfirm = () => {
    setIsDeleteConfirmModalOpen(true);
  };

  const handleLike = () => {
    return !isLiked ? like.mutate() : disLike.mutate();
  };

  return (
    <div className='bg-bg flex min-h-dvh flex-col gap-8 pb-30 md:gap-10 lg:gap-12'>
      <DetailWrapper>
        <DetailHeader
          tags={tags}
          isOwner={isOwner}
          onEdit={handleEdit}
          onRemove={handleRemoveConfirm}
        />
        <DetailContent content={content} author={author} />
        <DeatailFooter
          referenceTitle={referenceTitle}
          referenceUrl={referenceUrl}
          isLiked={isLiked}
          likeCount={likeCount}
          onLike={handleLike}
        />
      </DetailWrapper>
      <DeleteModal
        isOpen={isDeleteConfirmModalOpen}
        type='post'
        onClose={() => setIsDeleteConfirmModalOpen(false)}
        onDelete={handleRemove}
        isSubmitting={remove.isPending}
      />

      <Inner>
        <EpigramComments id={id} />
      </Inner>
    </div>
  );
}
