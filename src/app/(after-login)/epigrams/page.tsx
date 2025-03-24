'use client';

import { useSession } from 'next-auth/react';
import TodayMood from '@/components/TodayMood';
import { useEmotionLogToday } from '@/apis/emotion/emotion.queries';
import { useEffect, useState } from 'react';
import TodayEpigram from './_components/TodayEpigram';
import RecentEpigram from './_components/RecentEpigram';
import RecentComment from './_components/RecentComment';
import { AnimatePresence, motion } from 'motion/react';
import Inner from '@/components/Inner';
import FloatingButtons from '../_components/FloatingButtons';

export default function Page() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const { data: emotionLog, isLoading } = useEmotionLogToday(userId);
  const [showTodayMood, setShowTodayMood] = useState(true);

  useEffect(() => {
    setShowTodayMood(!emotionLog?.emotion);
  }, [emotionLog, isLoading]);

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
              <TodayMood label='오늘의 감정을 선택해 주세요' />
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
