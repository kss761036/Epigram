'use client';

import { ReactNode } from 'react';
import { cn } from '@/utils/helper';

interface SectionProps {
  children?: ReactNode;
  className?: string;
}

export function Section({ className, children }: SectionProps) {
  return (
    <div className={cn('mb-6 flex items-center justify-between md:mb-8 lg:mb-10', className)}>
      {typeof children === 'string' ? <SectionTitle>{children}</SectionTitle> : children}
    </div>
  );
}

export function SectionTitle({ children, className }: SectionProps) {
  return (
    <h2
      className={cn(
        'text-black-600 text-[16px] leading-7 font-semibold md:text-[20px] lg:text-[24px]',
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function SectionUtil({ children, className }: SectionProps) {
  return <div className={cn(className)}>{children}</div>;
}
