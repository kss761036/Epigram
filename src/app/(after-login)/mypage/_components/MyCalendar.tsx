'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getEmotionLogsMonthly } from '@/apis/emotion/emotion.service';
import { Emotion } from '@/types/common';
import { format } from 'date-fns';
import Calendar from '@/components/Calendar';

export default function MyCalendar() {
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
  return (
    <div className='mt-[58px] mb-[58px] md:mt-[62px] md:mb-[62px] lg:mt-[165px] lg:mb-[165px]'>
      <Calendar moodData={moodData} onMonthChange={setCurrentMonth} />
    </div>
  );
}
