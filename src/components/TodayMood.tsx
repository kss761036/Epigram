'use client';

import EmojiButton from './EmojiButton';
import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEmotionLogToday, useCreateEmotionLog } from '@/apis/emotion/emotion.queries';
import { EMOTION, Emotion } from '@/types/common';
import { cn } from '@/utils/helper';

interface TodayMoodProps {
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export default function TodayMood({ label, containerClassName, labelClassName }: TodayMoodProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const userId = session?.user?.id;

  const { data: emotion } = useEmotionLogToday(userId);
  const mutation = useCreateEmotionLog(userId);

  const handleClick = (emotion: Emotion) => {
    if (!mutation.isPending) {
      mutation.mutate(
        { emotion },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['emotion'] });
          },
        },
      );
    }
  };

  const selectedEmotion = emotion?.emotion || null;

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
        {Object.values(EMOTION).map((emotion) => (
          <EmojiButton
            key={emotion}
            name={emotion}
            onClick={() => handleClick(emotion)}
            selected={selectedEmotion === emotion}
          />
        ))}
      </div>
    </>
  );
}
