import { PropsWithChildren, Suspense } from 'react';
import AuthHeader from '@/components/headers/Auth';

export default function layout({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <AuthHeader />
      {children}
    </Suspense>
  );
}
