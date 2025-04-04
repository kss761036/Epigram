'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { createEpigram } from '@/apis/epigram/epigram.service';
import { CreateEpigramFormType } from '@/apis/epigram/epigram.type';
import Inner from '@/components/Inner';
import { Section } from '@/components/Section';
import EpigramForm from '../_components/EpigramForm';

export default function Page() {
  const router = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createEpigram,
  });
  const methods = useForm();
  const { reset } = methods;

  return (
    <Inner className='p-6 lg:py-8'>
      <Section>에피그램 만들기</Section>
      <EpigramForm
        mode='create'
        isSubmitting={isPending}
        onSubmit={async (data: CreateEpigramFormType) => {
          try {
            const result = await mutateAsync(data);
            toast.success('에피그램이 작성되었습니다.');
            reset();
            router.push(`/epigrams/${result.id}`);
          } catch (error) {
            console.error('에피그램 작성 실패:', error);
            toast.error('에피그램 작성에 실패했습니다.');
          }
        }}
      />
    </Inner>
  );
}
