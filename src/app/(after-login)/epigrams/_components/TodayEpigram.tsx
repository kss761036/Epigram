import { getTodayEpigram } from '@/apis/epigram/epigram.service';
import { Section } from '@/components/Section';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/Spinner';
import Card from '@/components/Card';

export default function TodayEpigram() {
  const { data } = useQuery({
    queryKey: ['todayEpigram'],
    queryFn: getTodayEpigram,
  });

  if (!data)
    return (
      <>
        <Section>오늘의 에피그램</Section>
        <div className='flex flex-col items-center justify-center gap-4 p-4 text-center text-blue-400'>
          <Spinner className='fill-black text-gray-100' />
          에피그램을 가져오는 중입니다.
        </div>
      </>
    );

  return (
    <>
      <Section>오늘의 에피그램</Section>
      <Card
        id={data.id}
        content={data.content}
        author={data.author}
        likeCount={data.likeCount}
        writerId={data.writerId}
        referenceUrl={data.referenceUrl ?? ''}
        referenceTitle={data.referenceTitle}
        tags={data.tags}
      />
    </>
  );
}
