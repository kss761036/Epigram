import { cn } from '@/utils/helper';
import { HTMLAttributes, PropsWithChildren } from 'react';

export default function Inner({
  className,
  children,
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn('mx-auto w-full max-w-[408px] px-6 lg:max-w-[664px]', className)}>
      {children}
    </div>
  );
}
