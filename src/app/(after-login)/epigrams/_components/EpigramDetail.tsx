'use client';

import { useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import {
  useDeleteEpigram,
  useEpigramDetails,
  useLikeEpigram,
} from '@/apis/epigram/epigram.queries';
import { EpigramDetail as EpigramDetailType } from '@/apis/epigram/epigram.type';
import DeleteModal from '@/components/DeleteModal';
import { DeatailFooter, DetailContent, DetailHeader, DetailWrapper, DetailLoading } from './detail';

interface EpigramDetailProps {
  id: EpigramDetailType['id'];
}

export default function EpigramDetail({ id }: EpigramDetailProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: details, isLoading } = useEpigramDetails(id);
  const { mutate: deleteEpigram, isPending: isDeletePending } = useDeleteEpigram();
  const { mutate: likeEpigram } = useLikeEpigram();
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);

  if (isLoading) return <DetailLoading />;
  if (!details) notFound();

  const { tags, content, author, writerId, referenceTitle, referenceUrl, likeCount, isLiked } =
    details;
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

    deleteEpigram(id, {
      onSuccess: () => {
        toast.success('게시물을 삭제했습니다.');
        router.replace(`/feeds`);
      },
    });
  };

  const handleRemoveConfirm = () => {
    setIsDeleteConfirmModalOpen(true);
  };

  const handleLike = () => {
    likeEpigram({ epigramId: id, flag: !isLiked });
  };

  return (
    <>
      <DetailWrapper>
        <DetailHeader //
          tags={tags}
          isOwner={isOwner}
          onEdit={handleEdit}
          onRemove={handleRemoveConfirm}
        />
        <DetailContent //
          content={content}
          author={author}
        />
        <DeatailFooter //
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
        isSubmitting={isDeletePending}
      />
    </>
  );
}
