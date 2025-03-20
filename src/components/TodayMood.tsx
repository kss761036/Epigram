'use client';

import { useState } from 'react';
import EmojiButton from './EmojiButton';
import { createEmotionLogToday } from '../apis/emotion/emotion.service';
import { Emotion } from '@/types/common';
import { cn } from '@/utils/helper';

interface TodayMoodProps {
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export default function TodayMood({ label, containerClassName, labelClassName }: TodayMoodProps) {
  const [loading, setLoading] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);

  const handleClick = async (emotion: Emotion) => {
    if (loading) return;
    setLoading(true);
    try {
      await createEmotionLogToday({ emotion });
      setSelectedEmotion(emotion);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <label className={cn('text-black-600 text-lg font-semibold lg:text-2xl', labelClassName)}>
        {label}
      </label>
      <div
        className={cn(
          'mt-[24px] flex h-[84px] w-full justify-center gap-4 md:h-[96px] lg:mt-[48px] lg:h-[136px] lg:gap-6',
          containerClassName,
        )}
      >
        <EmojiButton
          name='MOVED'
          onClick={() => handleClick('MOVED')}
          selected={selectedEmotion === 'MOVED'}
        />
        <EmojiButton
          name='HAPPY'
          onClick={() => handleClick('HAPPY')}
          selected={selectedEmotion === 'HAPPY'}
        />
        <EmojiButton
          name='WORRIED'
          onClick={() => handleClick('WORRIED')}
          selected={selectedEmotion === 'WORRIED'}
        />
        <EmojiButton
          name='SAD'
          onClick={() => handleClick('SAD')}
          selected={selectedEmotion === 'SAD'}
        />
        <EmojiButton
          name='ANGRY'
          onClick={() => handleClick('ANGRY')}
          selected={selectedEmotion === 'ANGRY'}
        />
      </div>
    </>
  );
}
