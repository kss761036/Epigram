'use client';

import React from 'react';
import { cn } from '@/utils/helper';

type RadioProps = {
  label: string;
  name: string;
  value?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
};

const Radio: React.FC<RadioProps> = ({
  label,
  name,
  value = label,
  checked,
  onChange,
  onBlur,
  inputRef,
}) => {
  return (
    <label className='flex cursor-pointer items-center gap-2'>
      <input
        type='radio'
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        ref={inputRef}
        className='hidden'
      />
      <span className='relative block h-5 w-5 rounded-full border-2 border-blue-300'>
        <span
          className={cn(
            'absolute top-1/2 left-1/2 block h-2 w-2 -translate-1/2 scale-0 rounded-full bg-blue-800 transition-transform duration-100',
            checked && 'scale-100',
          )}
        ></span>
      </span>
      {label}
    </label>
  );
};

export default Radio;
