'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/helper';
import Icon from './Icon';

const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-full focus:outline-none group cursor-pointer  hover:shadow-[0_4px_4px_rgba(172,172,172,0.2)]',
  {
    variants: {
      variant: {
        camera:
          'w-[80px] h-[80px] bg-black-700 md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px]',
        arrowUp: 'w-[48px] h-[48px] bg-blue-900 lg:w-[64px] lg:h-[64px]',
      },
    },
    defaultVariants: {
      variant: 'arrowUp',
    },
  },
);

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {}

export default function IconButton({ variant, className, ...props }: IconButtonProps) {
  return (
    <button className={cn(iconButtonVariants({ variant }), className)} {...props}>
      {variant === 'arrowUp' && (
        <Icon
          name='arrowDown'
          className='w-6 rotate-180 text-blue-100 transition-transform duration-300 group-hover:scale-115 lg:w-[30px]'
        />
      )}
      {variant === 'camera' && (
        <Icon
          name='camera'
          className='w-6 text-blue-100 transition-transform duration-300 group-hover:scale-110 md:w-9 lg:w-12'
        />
      )}
    </button>
  );
}
