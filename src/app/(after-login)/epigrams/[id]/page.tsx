import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { axiosServerInstance } from '@/utils/axios';
import { getQueryClient } from '@/utils/getQueryClient';
import Inner from '@/components/Inner';
import EpigramDetail from '../_components/EpigramDetail';
import EpigramComments from '../_components/EpigramComments';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: ['epigrams', id],
      queryFn: async () => {
        const response = await axiosServerInstance.get(`/epigrams/${id}`);
        return response.data;
      },
    });
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }

    throw new Error('게시물을 가져오는데 문제가 생겼습니다.');
  }

  return (
    <div className='bg-bg flex min-h-dvh flex-col gap-8 md:gap-10 lg:gap-12'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EpigramDetail id={id} />
      </HydrationBoundary>

      <Inner>
        <EpigramComments id={id} />
      </Inner>
    </div>
  );
}
