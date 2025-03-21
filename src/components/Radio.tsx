'use client';

import { cn } from '@/utils/helper';
import React from 'react';

type RadioProps = {
  label: string;
  name: string;
  checked?: boolean;
  onChange?: (value: string) => void;
};

const Radio: React.FC<RadioProps> = ({ label, name, checked, onChange }) => {
  return (
    <label className='flex cursor-pointer items-center gap-2'>
      <input
        type='radio'
        name={name}
        value={label}
        checked={checked}
        onChange={() => onChange?.(label)}
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
