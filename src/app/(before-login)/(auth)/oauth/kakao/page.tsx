'use client';

import { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { redirect, useSearchParams } from 'next/navigation';
import IconKakao from '@/assets/img/auth/icon-kakao.svg';
import OauthWrapper, {
  OauthIcon,
  OauthLoading,
  OauthMessage,
} from '../../_components/OauthWrapper';

export default function KakaoCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    (async function () {
      const res = await signIn('kakao', {
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

  return (
    <OauthWrapper>
      <OauthLoading>
        <OauthIcon>
          <Image src={IconKakao} alt='카카오 로그인' fill />
        </OauthIcon>
        <OauthMessage>카카오 로그인중</OauthMessage>
      </OauthLoading>
    </OauthWrapper>
  );
}
