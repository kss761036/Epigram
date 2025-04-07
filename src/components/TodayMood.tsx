'use client';

import { format } from 'date-fns';
import { EmotionLog } from '@/apis/emotion/emotion.type';
import { EMOTION, Emotion } from '@/types/common';
import { cn } from '@/utils/helper';
import EmojiButton from './EmojiButton';

interface TodayMoodProps {
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  showDate?: boolean;
  emotion?: EmotionLog | null;
  onEmotionClick: (emotion: Emotion) => void | Promise<void>;
  isLoading?: boolean;
}

export default function TodayMood({
  label,
  containerClassName,
  labelClassName,
  showDate = false,
  emotion,
  onEmotionClick,
  isLoading = false,
}: TodayMoodProps) {
  const selectedEmotion = emotion?.emotion || null;
  const today = format(new Date(), 'yyyy.MM.dd');

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
              onClick={() => onEmotionClick(emotion)}
              selected={selectedEmotion === emotion}
            />
          ))}
        </div>
      </div>
    </>
  );
}
