import Inner from '@/components/Inner';
import FloatingButtons from '../_components/FloatingButtons';
import RecentComment from './_components/RecentComment';
import RecentEpigram from './_components/RecentEpigram';
import TodayEmotion from './_components/TodayEmotion';
import TodayEpigram from './_components/TodayEpigram';

export default function Page() {
  return (
    <div className='bg-bg flex h-full w-full justify-center'>
      <Inner className='mt-[32px] h-full lg:mt-[120px]'>
        <TodayEpigram />
        <TodayEmotion />
        <RecentEpigram />
        <RecentComment />
      </Inner>
      <FloatingButtons />
    </div>
  );
}
