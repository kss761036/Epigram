import { PropsWithChildren, Suspense } from 'react';
import BeforeLoginHeader from '@/components/headers/BeforeLogin';

export default function layout({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <BeforeLoginHeader />
      {children}
    </Suspense>
  );
}
