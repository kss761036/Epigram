import { PropsWithChildren } from 'react';

export default function OauthWrapper({ children }: PropsWithChildren) {
  return (
    <div data-scroll-reset className='bg-bg flex min-h-dvh items-center justify-center'>
      {children}
    </div>
  );
}

export function OauthLoading({ children }: PropsWithChildren) {
  return <div className='flex flex-col items-center justify-center gap-8'>{children}</div>;
}

export function OauthIcon({ children }: PropsWithChildren) {
  return (
    <div className='relative'>
      <div className='relative z-1 aspect-square w-20 rounded-full bg-white'>{children}</div>
      <span className='absolute top-1/2 left-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-blue-400 opacity-75'></span>
    </div>
  );
}

export function OauthMessage({ children }: PropsWithChildren) {
  return <div className='text-center text-blue-400'>{children}</div>;
}
