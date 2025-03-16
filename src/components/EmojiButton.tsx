import { Emotion, EMOTION_BORDER_COLOR, EMOTION_LABEL } from '@/types/common';
import { HTMLAttributes } from 'react';
import Emoji from './Emoji';
import { cn } from '@/utils/helper';

interface EmojiButton extends HTMLAttributes<HTMLButtonElement> {
  name: Emotion;
  selected?: boolean;
  withLabel?: boolean;
}

export default function EmojiButton({ name, selected, withLabel = true, ...props }: EmojiButton) {
  const buttonClassName = cn(
    'flex aspect-square w-full flex-col items-center justify-center rounded-lg border-[3px] bg-[#F3F5F8] border-[#F3F5F8] md:rounded-2xl lg:rounded-[16px] lg:border-[4px] cursor-pointer hover:bg-blue-200 hover:border-blue-200',
    selected &&
      `${EMOTION_BORDER_COLOR[name]} bg-white hover:${EMOTION_BORDER_COLOR[name]} hover:bg-white`,
  );

  const labelClassName = cn(
    'md:text-md text-xs opacity-20 lg:text-[20px]',
    selected && 'opacity-100',
  );

  return (
    <div className='grid gap-2 text-center'>
      <button className={buttonClassName} {...props} data-selected={selected} data-name={name}>
        <Emoji name={name} className='w-8 lg:w-12' />
      </button>
      {withLabel && <div className={labelClassName}>{EMOTION_LABEL[name]}</div>}
    </div>
  );
}
