'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginFormSchema, LoginFormType } from '@/apis/auth/auth.type';
import Button from '@/components/Button';
import FormError from '@/components/FormError';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const isDisabled = isLoading || !isValid;

  const onSubmit = async (data: LoginFormType) => {
    try {
      setIsLoading(true);

      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.ok) {
        window.location.replace('/');
      } else {
        router.push(`/login?error=${res?.error}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && <FormError message={error} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-5 flex flex-col gap-2.5 md:gap-4 lg:mb-6'>
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
            autoComplete='new-password'
          />
        </div>
        <Button type='submit' disabled={isDisabled}>
          {isLoading ? <Spinner /> : '로그인'}
        </Button>
      </form>
    </>
  );
}
