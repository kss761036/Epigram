'use client';

import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { Emotion } from '@/types/common';
import { cn } from '@/utils/helper';
import Emoji from './Emoji';
import EmotionFilter from './EmotionFilter';
import Icon from './Icon';

export interface CalendarProps {
  moodData?: { [dateString: string]: Emotion };
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

export default function Calendar({ moodData, currentMonth, setCurrentMonth }: CalendarProps) {
  const [filterEmotion, setFilterEmotion] = useState<Emotion | null>(null);

  function renderHeader() {
    return (
      <div className='relative mb-[22px] flex items-center justify-between md:mb-[24px] lg:mb-[48px]'>
        <span className='text-black-600 text-lg font-semibold lg:text-2xl'>
          {format(currentMonth, 'yyyy년 MMMM', { locale: ko })}
        </span>
        <div className='flex gap-4 lg:gap-6'>
          <EmotionFilter
            value={filterEmotion}
            onChange={(value) => setFilterEmotion(value === filterEmotion ? null : value)}
          />
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className='cursor-pointer rounded-[3px] hover:bg-blue-200'
          >
            <span className='sr-only'>이전월</span>
            <Icon name='arrowLeft' className='w-5 lg:w-9' />
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className='cursor-pointer rounded-[3px] hover:bg-blue-200'
          >
            <span className='sr-only'>다음월</span>
            <Icon name='arrowRight' className='w-5 lg:w-9' />
          </button>
        </div>
      </div>
    );
  }

  function renderDays() {
    const startDate = startOfWeek(currentMonth, { locale: ko });
    return (
      <div className='flex h-[44px] items-center justify-center border-t border-blue-200 text-lg text-gray-200 md:h-[54px] lg:h-[91px] lg:text-2xl'>
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className='flex flex-1 items-center justify-center'>
            {format(addDays(startDate, i), 'EEE', { locale: ko })}
          </div>
        ))}
      </div>
    );
  }

  function renderCells() {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale: ko });
    const endDate = endOfWeek(monthEnd, { locale: ko });

    const rows = [];
    let day = startDate;

    while (day <= endDate) {
      const weekCells = Array.from({ length: 7 }, (_, i) => {
        const currentDay = addDays(day, i);
        const dateKey = format(currentDay, 'yyyy-MM-dd');
        const mood = moodData ? moodData[dateKey] : undefined;
        const formattedDay = format(currentDay, 'd');
        const isToday = format(currentDay, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

        const baseStyle =
          'flex h-[44px] flex-1 items-center justify-center border-t border-blue-200 text-lg font-semibold text-gray-200 md:h-[54px] lg:h-[91px] lg:text-2xl';
        const moodStyle = 'flex-col text-[8px] md:text-[10px] lg:text-[16px]';
        const todayStyle = 'outline-red z-2 rounded-[3px] outline-3';

        return (
          <div
            key={currentDay.toString()}
            className={cn(
              baseStyle,
              (filterEmotion === null || (mood && filterEmotion === mood)) && mood && moodStyle,
              isToday && todayStyle,
            )}
          >
            {formattedDay}
            {(filterEmotion === null || (mood && filterEmotion === mood)) && mood && (
              <Emoji name={mood} className='w-[24px] lg:w-[36px]' />
            )}
          </div>
        );
      });
      rows.push(
        <div key={day.toString()} className='flex'>
          {weekCells}
        </div>,
      );
      day = addDays(day, 7);
    }
    return <div>{rows}</div>;
  }

  return (
    <div className='w-full bg-blue-100'>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
