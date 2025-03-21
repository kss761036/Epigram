'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import EpigramForm from '@/components/EpigramForm';
import { getEpigramDetails, updateEpigram } from '@/apis/epigram/epigram.service';
import { CreateEpigramFormType } from '@/apis/epigram/epigram.type';
import Spinner from '@/components/Spinner';
import { Section } from '@/components/Section';
import ErrorPage from '@/app/error';

interface EditEpigramPageProps {
  params: Promise<{ id: string }>;
}

export default function EditEpigramPage({ params }: EditEpigramPageProps) {
  const router = useRouter();
  const { id } = use(params);

  const { data: session } = useSession();
  const sessionUserId = session?.user?.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['epigram', id],
    queryFn: async () => await getEpigramDetails(Number(id)),
    enabled: !!id,
    retry: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateEpigramFormType) => updateEpigram(Number(id), data),
    onSuccess: () => {
      toast.success('에피그램이 수정되었습니다.');
      router.push(`/epigrams/${id}`);
    },
    onError: () => {
      toast.error('에피그램 수정에 실패했습니다.');
    },
  });

  if (isLoading)
    return (
      <div className='flex h-[100dvh] items-center justify-center'>
        <Spinner className='w-10 fill-black text-gray-100' />
      </div>
    );
  if (isError || !data) return <ErrorPage error={new Error('에피그램을 불러오지 못했습니다.')} />;

  if (data.writerId !== sessionUserId) {
    return <ErrorPage error={new Error('수정 권한이 없습니다.')} />;
  }

  return (
    <div className='mx-auto w-full max-w-[408px] p-6 lg:max-w-[664px] lg:py-8'>
      <Section>에피그램 수정</Section>
      <EpigramForm
        mode='edit'
        defaultValues={{
          ...data,
          tags: data.tags.map((tag) => tag.name),
        }}
        onSubmit={(formData: CreateEpigramFormType) => mutate(formData)}
        isSubmitting={isPending}
      />
    </div>
  );
}
