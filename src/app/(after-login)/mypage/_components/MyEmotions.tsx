'use client';

import { useSession } from 'next-auth/react';
import {
  useCreateEmotionLog,
  useEmotionLogsMonthly,
  useEmotionLogToday,
} from '@/apis/emotion/emotion.queries';
import TodayMood from '@/components/TodayMood';
import { Emotion } from '@/types/common';
import MonthlyLogs from './MonthlyLogs';

export default function MyEmotions() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: emotion } = useEmotionLogToday(userId);
  const { isPending, mutate: createEmotion } = useCreateEmotionLog(userId);
  const { data: moodData = {}, currentMonth, setCurrentMonth } = useEmotionLogsMonthly(userId);

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
    <>
      <TodayMood
        emotion={emotion}
        onEmotionClick={handleEmotionClick}
        label='오늘의 감정'
        showDate
      />
      <MonthlyLogs
        moodData={moodData}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
    </>
  );
}
