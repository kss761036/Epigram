import { cva, VariantProps } from 'class-variance-authority';
import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/helper';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-semibold text-blue-100 disabled:cursor-not-allowed px-4 py-2 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-black-500 hover:bg-black-600 active:bg-black-700 disabled:bg-blue-400 disabled:border-blue-300',
        outlined:
          'border-black-500 hover:border-black-600 active:border-black-700 border bg-transparent disabled:border-blue-400 disabled:bg-blue-300',
      },
      size: {
        default: 'lg:text-xl h-[44px] text-lg lg:h-[64px] w-full',
        xs: 'h-[32px] w-[53px] text-xs lg:h-[44px] lg:w-[60px] lg:text-lg',
        md: 'h-[48px] w-[112px] text-lg lg:h-[56px] lg:w-[136px] lg:text-xl',
        lg: 'h-[64px] w-[286px] text-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function Button({ className, variant, size, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  );
}
