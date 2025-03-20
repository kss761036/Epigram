'use client';

import EmojiButton from './EmojiButton';
import { useSession } from 'next-auth/react';
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

  const userId = session?.user.id;

  const { data: emotionLog } = useEmotionLogToday(userId);

  const mutation = useCreateEmotionLog(userId);

  const isPending = mutation.status === 'pending';

  const handleClick = (emotion: Emotion) => {
    if (!isPending) {
      mutation.mutate({ emotion });
    }
  };

  const selectedEmotion = emotionLog?.emotion || null;

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
          name={EMOTION.MOVED}
          onClick={() => handleClick(EMOTION.MOVED)}
          selected={selectedEmotion === EMOTION.MOVED}
          disabled={isPending}
        />
        <EmojiButton
          name={EMOTION.HAPPY}
          onClick={() => handleClick(EMOTION.HAPPY)}
          selected={selectedEmotion === EMOTION.HAPPY}
          disabled={isPending}
        />
        <EmojiButton
          name={EMOTION.WORRIED}
          onClick={() => handleClick(EMOTION.WORRIED)}
          selected={selectedEmotion === EMOTION.WORRIED}
          disabled={isPending}
        />
        <EmojiButton
          name={EMOTION.SAD}
          onClick={() => handleClick(EMOTION.SAD)}
          selected={selectedEmotion === EMOTION.SAD}
          disabled={isPending}
        />
        <EmojiButton
          name={EMOTION.ANGRY}
          onClick={() => handleClick(EMOTION.ANGRY)}
          selected={selectedEmotion === EMOTION.ANGRY}
          disabled={isPending}
        />
      </div>
    </>
  );
}
