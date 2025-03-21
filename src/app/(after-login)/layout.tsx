import { PropsWithChildren, Suspense } from 'react';
import AfterLoginHeader from '@/components/headers/AfterLogin';

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className='pt-13 md:pt-15.5 lg:pt-20'>
      <AfterLoginHeader />
      <Suspense>{children}</Suspense>
    </div>
  );
}
