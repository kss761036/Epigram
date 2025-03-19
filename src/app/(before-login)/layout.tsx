import BeforeLoginHeader from '@/components/headers/BeforeLogin';
import { PropsWithChildren, Suspense } from 'react';

export default function layout({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <BeforeLoginHeader />
      {children}
    </Suspense>
  );
}
