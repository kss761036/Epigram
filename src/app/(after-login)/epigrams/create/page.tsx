'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createEpigram } from '@/apis/epigram/epigram.service';
import { CreateEpigramFormType } from '@/apis/epigram/epigram.type';
import { Section } from '@/components/Section';
import EpigramForm from '../_components/EpigramForm';
import Inner from '@/components/Inner';

export default function Page() {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: createEpigram,
    onSuccess: (data) => {
      toast.success('에피그램이 작성되었습니다.');
      router.push(`/epigrams/${data.id}`);
    },
    onError: (error) => {
      console.error('에피그램 작성 실패:', error);
      toast.error('에피그램 작성에 실패했습니다.');
    },
  });

  return (
    <Inner className='p-6 lg:py-8'>
      <Section>에피그램 만들기</Section>
      <EpigramForm
        mode='create'
        onSubmit={(data: CreateEpigramFormType) => mutate(data)}
        isSubmitting={isPending}
      />
    </Inner>
  );
}
