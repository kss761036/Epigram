'use client';

import { useSession } from 'next-auth/react';

export default function LandingPage() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className='grid justify-center gap-4 p-4 text-center'>
      <h1 className='text-3xl'>랜딩페이지</h1>
      <div className='font-iropke text-lg'>이롭게바탕체</div>
    </div>
  );
}
