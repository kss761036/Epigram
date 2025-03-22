import { PropsWithChildren } from 'react';
import Inner from '@/components/Inner';

export default function SearchWrapper({ children }: PropsWithChildren) {
  return (
    <Inner className='py-4 md:py-4 lg:py-6'>
      <div className='flex flex-col gap-6 md:gap-8 lg:gap-10'>{children}</div>
    </Inner>
  );
}
