'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/helper';
import Link from 'next/link';

const buttonVariants = cva(
  'inline-flex items-center justify-self-center justify-center gap-1 rounded-full cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-black-600 text-white',
        outlined: 'border border-blue-400 bg-transparent text-blue-400',
      },
      size: {
        default: 'h-9 px-[14px] text-[14px] md:h-12 md:px-[18px] md:text-[20px]',
        lg: 'h-12 px-[18px] text-[14px] md:h-14 md:px-[20px] md:text-[20px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface EtcButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  onClick?: () => void;
}

export default function EtcButton({
  onClick,
  children,
  size,
  variant,
  className,
  target,
  href,
  ...props
}: EtcButtonProps) {
  const buttonClass = cn(buttonVariants({ variant, size }), className);

  if (href) {
    const isBlank = target === '_blank';
    return (
      <Link
        href={href}
        className={buttonClass}
        target={target}
        rel={isBlank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
