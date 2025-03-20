import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/utils/helper';

export function SocialList({ children }: PropsWithChildren) {
  return <div className='flex items-center justify-center gap-4'>{children}</div>;
}

export function SocialHeader({ children }: PropsWithChildren) {
  return (
    <div className='relative mb-6 flex items-center justify-center text-xs after:absolute after:top-1/2 after:left-0 after:h-[1px] after:w-full after:bg-gray-100 after:content-[""] lg:mb-10 lg:text-xl'>
      <span className='bg-bg relative z-1 px-[14px] text-blue-400 lg:px-6'>{children}</span>
    </div>
  );
}

export function SocialButton({
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={cn(
        'relative aspect-square w-10 cursor-pointer items-center justify-center rounded-sm border border-gray-100 lg:w-[60px]',
        className,
      )}
      {...props}
    />
  );
}
