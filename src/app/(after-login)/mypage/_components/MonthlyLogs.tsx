'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getEmotionLogsMonthly } from '@/apis/emotion/emotion.service';
import { Emotion, EMOTION_LABEL } from '@/types/common';
import { format } from 'date-fns';
import Calendar from '@/components/Calendar';
import Chart from '@/components/Chart';
import Emoji from '@/components/Emoji';
import { getPercentage } from '@/utils/getPercentage';
import { motion, AnimatePresence } from 'framer-motion';

const emotionColors: Record<Emotion, string> = {
  MOVED: '#48BB98',
  HAPPY: '#FBC85B',
  WORRIED: '#C7D1E0',
  SAD: '#E3E9F1',
  ANGRY: '#EFF3F8',
};

export default function MonthlyLogs() {
  const [moodData, setMoodData] = useState<{ [dateString: string]: Emotion }>({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    async function fetchEmotionLogs() {
      if (!userId) return;

      try {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1;

        const data = await getEmotionLogsMonthly({ userId, year, month });

        const formattedData: { [dateString: string]: Emotion } = {};
        data.forEach((log) => {
          const dateKey = format(new Date(log.createdAt), 'yyyy-MM-dd');
          formattedData[dateKey] = log.emotion;
        });

        setMoodData(formattedData);
      } catch (error) {
        console.error('감정 데이터를 불러오는 중 오류 발생:', error);
      }
    }

    fetchEmotionLogs();
  }, [userId, currentMonth]);

  const emotionCounts = Object.values(moodData).reduce(
    (acc, emotion) => {
      acc[emotion] = (acc[emotion] || 0) + 1;
      return acc;
    },
    {} as Record<Emotion, number>,
  );

  const chartValues = Object.values(emotionCounts);
  const chartLabels = Object.keys(emotionCounts) as Emotion[];
  const chartColors = chartLabels.map((emotion) => emotionColors[emotion]);

  return (
    <div className='mt-[58px] mb-[58px] md:mt-[62px] md:mb-[62px] lg:mt-[165px] lg:mb-[165px]'>
      <Calendar moodData={moodData} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />

      <Chart
        values={chartValues}
        labels={chartLabels}
        colors={chartColors}
        customLabel={(data) => {
          const name = data.label as Emotion;
          return (
            <div className='flex items-center gap-3'>
              <Emoji name={name} className='w-4 lg:w-6' />
              <span className='text-xs font-semibold lg:text-xl'>
                {getPercentage(data.value, chartValues)}
              </span>
            </div>
          );
        }}
        customCenter={(currentData) => {
          if (!currentData || !currentData.label) return null;

          const name = currentData.label as Emotion;
          return (
            <AnimatePresence mode='wait'>
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className='flex flex-col items-center justify-center gap-2 text-center text-lg font-bold'
              >
                <Emoji name={name} className='w-6 lg:w-10' />
                <span>{EMOTION_LABEL[name]}</span>
              </motion.div>
            </AnimatePresence>
          );
        }}
        showLegend={true}
      />
    </div>
  );
}
