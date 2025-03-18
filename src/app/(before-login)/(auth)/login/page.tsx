'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema, LoginFormType } from '@/apis/auth/auth.type';
import Input from '@/components/Input';
import Button from '@/components/Button';
import FormError from '@/components/FormError';

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onBlur',
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const handleKakaoLogin = async () => {
    window.location.href = '/api/auth/oauth/kakao';
  };

  const handleGoogleLogin = async () => {
    window.location.href = '/api/auth/oauth/google';
  };

  const onSubmit = async (data: LoginFormType) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      router.replace('/');
    } else {
      router.push(`/login?error=${res?.error}`);
    }
  };

  return (
    <div className='mx-auto mt-10 max-w-md'>
      {error && <FormError message={error} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
          <Input
            {...register('email')}
            type='email'
            placeholder='이메일'
            error={errors.email?.message}
          />
          <Input
            {...register('password')}
            type='password'
            placeholder='비밀번호'
            error={errors.password?.message}
          />
        </div>

        <Button type='submit' className='mt-6' disabled={isSubmitting || !isValid}>
          로그인
        </Button>
      </form>
      <Button onClick={handleKakaoLogin} className='mt-4'>
        카카오 로그인
      </Button>
      <Button onClick={handleGoogleLogin} className='mt-4'>
        구글 로그인
      </Button>
    </div>
  );
}
