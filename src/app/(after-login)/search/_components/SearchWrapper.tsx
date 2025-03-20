import { PropsWithChildren } from 'react';

export default function SearchWrapper({ children }: PropsWithChildren) {
  return (
    <div className='py-4 md:py-4 lg:py-6'>
      <div className='mx-auto flex w-full max-w-[384px] flex-col gap-6 md:gap-8 lg:max-w-[640px] lg:gap-10'>
        {children}
      </div>
    </div>
  );
}
