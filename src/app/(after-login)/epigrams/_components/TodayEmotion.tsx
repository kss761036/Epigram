'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useSession } from 'next-auth/react';
import { useCreateEmotionLog, useEmotionLogToday } from '@/apis/emotion/emotion.queries';
import TodayMood from '@/components/TodayMood';
import { Emotion } from '@/types/common';

export default function TodayEmotion() {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const { data: emotion, isLoading } = useEmotionLogToday(userId);
  const { isPending, mutate: createEmotion } = useCreateEmotionLog(userId);
  const showTodayMood = userId && !isLoading && !emotion;

  const handleEmotionClick = (emotion: Emotion) => {
    if (isPending) return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
      createEmotion(
        { emotion },
        {
          onSuccess: () => resolve(),
          onError: () => reject(),
        },
      );
    });
  };

  return (
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
  );
}
