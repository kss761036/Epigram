import { PropsWithChildren, Suspense } from 'react';

export default function layout({ children }: PropsWithChildren) {
  return <Suspense>{children}</Suspense>;
}
