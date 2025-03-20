import { PropsWithChildren, Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/nextauth';
import AfterLoginHeader from '@/components/headers/AfterLogin';

export default async function layout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  return (
    <div className='pt-13 md:pt-15.5 lg:pt-20'>
      <AfterLoginHeader session={session} />
      <Suspense>{children}</Suspense>
    </div>
  );
}
