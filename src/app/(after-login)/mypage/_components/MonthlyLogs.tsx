'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from '@/components/Calendar';
import Chart from '@/components/Chart';
import Emoji from '@/components/Emoji';
import { Emotion, EMOTION_LABEL } from '@/types/common';
import { getPercentage } from '@/utils/getPercentage';

const emotionChartColors: string[] = ['#48BB98', '#FBC85B', '#C7D1E0', '#E3E9F1', '#EFF3F8'];

interface MonthlyLogsProps {
  moodData: Record<string, Emotion>;
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

export default function MonthlyLogs({ moodData, currentMonth, setCurrentMonth }: MonthlyLogsProps) {
  const emotionCounts = Object.values(moodData).reduce(
    (acc, emotion) => {
      acc[emotion] = (acc[emotion] || 0) + 1;
      return acc;
    },
    {} as Record<Emotion, number>,
  );

  const chartValues = Object.values(emotionCounts);
  const chartLabels = Object.keys(emotionCounts) as Emotion[];
  const chartColors = emotionChartColors;

  return (
    <>
      <div className='my-14 h-[360px] md:my-[60px] md:h-[432px] lg:my-[164px] lg:h-[737px]'>
        <Calendar
          moodData={moodData}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
      </div>

      <p className='text-black-600 mb-6 text-lg font-semibold lg:mb-12 lg:text-2xl'>감정 차트</p>
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
    </>
  );
}
