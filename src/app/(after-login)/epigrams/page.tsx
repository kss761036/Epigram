'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useSession } from 'next-auth/react';
import { useCreateEmotionLog, useEmotionLogToday } from '@/apis/emotion/emotion.queries';
import Inner from '@/components/Inner';
import TodayMood from '@/components/TodayMood';
import { Emotion } from '@/types/common';
import FloatingButtons from '../_components/FloatingButtons';
import RecentComment from './_components/RecentComment';
import RecentEpigram from './_components/RecentEpigram';
import TodayEpigram from './_components/TodayEpigram';

export default function Page() {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const { data: emotion, isLoading } = useEmotionLogToday(userId);
  const { isPending, mutate: createEmotion } = useCreateEmotionLog(userId);
  const showTodayMood = userId && !isLoading && !emotion;

  const handleEmotionClick = (emotion: Emotion) => {
    if (isPending) return;

    createEmotion({ emotion });
  };

  return (
    <div className='bg-bg flex h-full w-full justify-center'>
      <Inner className='mt-[32px] h-full lg:mt-[120px]'>
        <TodayEpigram />
        <AnimatePresence>
          {showTodayMood && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className='mt-[56px] lg:mt-[140px]'
            >
              <TodayMood
                emotion={emotion}
                onEmotionClick={handleEmotionClick}
                label='오늘의 감정을 선택해 주세요'
              />
            </motion.div>
          )}
        </AnimatePresence>
        <RecentEpigram />
        <RecentComment />
      </Inner>
      <FloatingButtons />
    </div>
  );
}
