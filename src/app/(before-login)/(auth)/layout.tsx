import AuthHeader from '@/components/headers/Auth';
import { PropsWithChildren, Suspense } from 'react';

export default function layout({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <AuthHeader />
      {children}
    </Suspense>
  );
}
