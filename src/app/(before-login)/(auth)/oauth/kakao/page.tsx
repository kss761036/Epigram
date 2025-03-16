'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KakaoCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (!code) return;

      try {
        const response = await fetch(`/api/auth/kakao?code=${code}`, { credentials: 'include' });
        const data = await response.json();

        if (data.user) {
          router.push('/');
        } else {
          console.error('로그인 실패:', data.error);
        }
      } catch (error) {
        console.error('카카오 로그인 요청 실패:', error);
      }
    };

    handleKakaoLogin();
  }, [router]);
}
