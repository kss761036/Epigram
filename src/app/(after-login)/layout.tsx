import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/nextauth';
import AfterLoginHeader from '@/components/headers/AfterLogin';
import { PropsWithChildren, Suspense } from 'react';

export default async function layout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);
  return (
    <Suspense>
      <AfterLoginHeader session={session} />
      {children}
    </Suspense>
  );
}
