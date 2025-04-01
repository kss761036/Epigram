'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { updateEpigram } from '@/apis/epigram/epigram.service';
import { CreateEpigramFormType } from '@/apis/epigram/epigram.type';
import Spinner from '@/components/Spinner';
import { Section } from '@/components/Section';
import ErrorPage from '@/app/error';
import EpigramForm from '../../_components/EpigramForm';
import Inner from '@/components/Inner';
import { useEpigram } from '@/apis/epigram/epigram.queries';

interface EditEpigramPageProps {
  params: Promise<{ id: string }>;
}

export default function EditEpigramPage({ params }: EditEpigramPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { data: session } = useSession();
  const sessionUserId = session?.user?.id;
  const queryClient = useQueryClient();
  const epigramId = Number(id);

  const { details } = useEpigram(epigramId);
  const data = details.data;
  const isLoading = details.isLoading;
  const isError = details.isError;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateEpigramFormType) => updateEpigram(epigramId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['epigrams'] });
    },
  });

  const handleUpdate = async (formData: CreateEpigramFormType) => {
    try {
      await mutateAsync(formData);
      toast.success('에피그램이 수정되었습니다.');
      router.push(`/epigrams/${id}`);
    } catch {
      toast.error('에피그램 수정에 실패했습니다.');
    }
  };

  if (isLoading)
    return (
      <div className='flex h-[100dvh] items-center justify-center'>
        <Spinner className='w-10 fill-black text-gray-100' />
      </div>
    );

  if (isError || !data) return <ErrorPage error={new Error('에피그램을 불러오지 못했습니다.')} />;
  if (data.writerId !== sessionUserId)
    return <ErrorPage error={new Error('수정 권한이 없습니다.')} />;

  return (
    <Inner className='p-6 lg:py-8'>
      <Section>에피그램 수정</Section>
      <EpigramForm
        mode='edit'
        initValues={{
          ...data,
          tags: data.tags.map((tag) => tag.name),
        }}
        isSubmitting={isPending}
        onSubmit={handleUpdate}
      />
    </Inner>
  );
}
