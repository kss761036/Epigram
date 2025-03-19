'use client';

import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SocialButton, SocialHeader, SocialList } from './Social';
import Logo from '@/assets/img/common/logo.svg';
import IconGoogle from '@/assets/img/auth/icon-google.svg';
import IconKakao from '@/assets/img/auth/icon-kakao.svg';

export default function AuthWrapper({ children }: PropsWithChildren) {
  return (
    <div className='bg-bg'>
      <AuthInner>
        <AuthHeader />
        <AuthBody>{children}</AuthBody>
        <AuthFooter />
      </AuthInner>
    </div>
  );
}

function AuthInner({ children }: PropsWithChildren) {
  return (
    <div className='mx-auto flex min-h-dvh w-full max-w-[432px] flex-col justify-center px-6 py-14 lg:max-w-[688px] lg:py-20'>
      {children}
    </div>
  );
}

function AuthHeader() {
  return (
    <header className='mb-[50px] flex justify-center lg:mb-[60px]'>
      <Link href='/'>
        <Image src={Logo} alt='epgiram' className='h-12 w-auto' />
      </Link>
    </header>
  );
}

function AuthBody({ children }: PropsWithChildren) {
  return <div className='mb-[50px] lg:mb-16'>{children}</div>;
}

function AuthFooter() {
  const pathname = usePathname();
  const socialMessage = 'SNS 계정으로 ' + (pathname === '/login' ? '로그인하기' : '간편 가입하기');

  const handleGoogleLogin = async () => {
    window.location.href = '/api/auth/oauth/google';
  };

  const handleKakaoLogin = async () => {
    window.location.href = '/api/auth/oauth/kakao';
  };

  return (
    <>
      <SocialHeader>{socialMessage}</SocialHeader>
      <SocialList>
        <SocialButton onClick={handleGoogleLogin} data-oauth-id='google'>
          <Image src={IconGoogle} alt='구글 로그인/회원가입' fill />
        </SocialButton>
        <SocialButton onClick={handleKakaoLogin} data-oauth-id='kakao'>
          <Image src={IconKakao} alt='카카오 로그인/회원가입' fill />
        </SocialButton>
      </SocialList>
    </>
  );
}
