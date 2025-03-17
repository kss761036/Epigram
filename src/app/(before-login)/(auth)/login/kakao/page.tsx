'use client';

import { useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function KakaoCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    (async function () {
      const res = await signIn('Kakao', {
        code,
        redirect: false,
      });

      if (res?.ok) {
        redirect('/');
      } else {
        redirect('/login?error=kakao login error');
      }
    })();
  }, [code]);

  return <div className='flex h-dvh items-center justify-center'>카카오 로그인 중...</div>;
}
