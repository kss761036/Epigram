'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { redirect, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import OauthWrapper, {
  OauthIcon,
  OauthLoading,
  OauthMessage,
} from '../../_components/OauthWrapper';
import IconGoogle from '@/assets/img/auth/icon-google.svg';

export default function GoogleCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    (async function () {
      const res = await signIn('google', {
        code,
        redirect: false,
      });

      if (res?.ok) {
        redirect('/');
      } else {
        redirect('/login?error=google login error');
      }
    })();
  }, [code]);

  return (
    <OauthWrapper>
      <OauthLoading>
        <OauthIcon>
          <Image src={IconGoogle} alt='구글 로그인' fill />
        </OauthIcon>
        <OauthMessage>구글 로그인중</OauthMessage>
      </OauthLoading>
    </OauthWrapper>
  );
}
