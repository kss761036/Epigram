'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { EmotionLog } from '@/apis/emotion/emotion.type';
import { EMOTION, Emotion } from '@/types/common';
import { cn } from '@/utils/helper';
import EmojiButton from './EmojiButton';
import Spinner from './Spinner';

interface TodayMoodProps {
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  showDate?: boolean;
  emotion?: EmotionLog | null;
  onEmotionClick: (emotion: Emotion) => Promise<void>;
}

export default function TodayMood({
  label,
  containerClassName,
  labelClassName,
  showDate = false,
  emotion,
  onEmotionClick,
}: TodayMoodProps) {
  const [isLoading, setIsLoading] = useState(false);

  const selectedEmotion = emotion?.emotion || null;
  const today = format(new Date(), 'yyyy.MM.dd');

  const handleEmotionClick = async (emotion: Emotion) => {
    setIsLoading(true);
    try {
      await onEmotionClick(emotion);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='flex justify-between'>
        <label className={cn('text-black-600 text-lg font-semibold lg:text-2xl', labelClassName)}>
          {label}
        </label>
        {showDate && <span className='text-lg text-blue-400 lg:text-xl'>{today}</span>}
      </div>
      <div className='relative'>
        <div
          className={cn(
            'mt-[24px] flex h-[84px] w-full justify-center gap-4 md:h-[96px] lg:mt-[48px] lg:h-[136px] lg:gap-6',
            containerClassName,
          )}
        >
          {Object.values(EMOTION).map((emotion) => (
            <EmojiButton
              key={emotion}
              name={emotion}
              onClick={() => handleEmotionClick(emotion)}
              selected={selectedEmotion === emotion}
            />
          ))}
        </div>

        {isLoading && (
          <div className='bg-bg/60 absolute inset-0 z-10 flex items-center justify-center rounded-[12px] backdrop-blur-sm'>
            <div className='flex flex-col items-center justify-center gap-4 p-4 text-center text-blue-400'>
              <Spinner />
              감정을 저장하고 있습니다.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
