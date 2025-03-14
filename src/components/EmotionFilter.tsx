'use client';

import { cn } from '@/utils/helper';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from './Dropdown';
import { EMOTION, Emotion, EMOTION_LABEL } from '@/types/common';
import EmojiButton from './EmojiButton';
import Icon from './Icon';

interface EmotionFilterProps {
  value: Emotion | null;
  onChange: (value: Emotion) => void;
  className?: string;
  offset?: number;
}

export default function EmotionFilter({
  value,
  onChange,
  className,
  offset = 20,
}: EmotionFilterProps) {
  const triggerClassName = cn(
    'bg-bg border-bg flex h-[30px] items-center justify-center gap-2 rounded-lg border-[2px] lg:pl-3 lg:pr-1 pl-2 pr-1.5 py-2 text-xs font-semibold group-aria-[expanded="true"]:border-black lg:h-[52px] lg:text-xl',
    !value && 'text-gray-200',
  );
  const menuClassName =
    'absolute left-1/2 flex w-[90vw] max-w-[300px] md:max-w-[560px] -translate-x-1/2 items-center gap-2 rounded-2xl border border-gray-50 bg-white p-4 shadow-[0px_3px_16px_0px_rgba(0,_0,_0,_0.1)] lg:gap-3';

  const menuOffeset = { top: `calc(100% + ${offset}px)` };

  const currentLabel = value ? EMOTION_LABEL[value] : '없음';
  const EMOTIONS = Object.keys(EMOTION) as Emotion[];

  return (
    <Dropdown className={className}>
      <DropdownTrigger>
        <div className={triggerClassName}>
          필터: {currentLabel} <Icon name='arrowDown' className='w-4 lg:w-8' />
        </div>
      </DropdownTrigger>
      <DropdownMenu className={menuClassName} style={menuOffeset}>
        {EMOTIONS.map((item) => (
          <DropdownItem key={item} className='flex-1'>
            <EmojiButton
              name={item}
              selected={item === value}
              withLabel={false}
              onClick={() => onChange(item)}
            />
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
