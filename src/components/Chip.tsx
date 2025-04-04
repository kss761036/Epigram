import { HTMLAttributes } from 'react';
import { cn } from '@/utils/helper';
import Icon from './Icon';

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  onRemove?: () => void;
}

export default function Chip({ className, label, onRemove, ...props }: ChipProps) {
  return (
    <div>
      <span
        className={cn(
          'bg-bg text-black-300 inline-flex items-center justify-center gap-1 rounded-[18px] px-3 py-2 text-lg md:gap-1.5 md:text-xl lg:gap-2 lg:px-3.5 lg:py-3 lg:text-2xl',
          className,
        )}
        {...props}
      >
        {label}
        {onRemove && (
          <Icon name='close' className='w-4.5 cursor-pointer md:w-5 lg:w-6' onClick={onRemove} />
        )}
      </span>
    </div>
  );
}
