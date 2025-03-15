'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { loginSchema, LoginFormValues } from '@/utils/validationSchema';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function Page() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        if (res.error.includes('비밀번호')) {
          setError('password', { message: res.error });
        } else if (res.error.includes('로그인')) {
          setError('password', { message: res.error });
        } else {
          setError('root', { message: res.error });
        }
        return;
      }

      router.push('/');
    } catch (error) {
      alert('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (errors.root) {
    alert(errors.root.message);
    return;
  }

  const handleGoogleLogin = async () => {
    signIn('google', {
      callbackUrl: '/',
    });
  };

  return (
    <div className='mx-auto mt-10 max-w-md'>
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
        <button type='button' onClick={handleGoogleLogin}>
          구글로그인
        </button>
      </form>
    </div>
  );
}
