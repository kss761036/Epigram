'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signupSchema, SignupFormValues } from '@/utils/validationSchema';
import { cn } from '@/utils/helper';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function Page() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.status === 400) {
        setError('email', { message: '이미 사용 중인 이메일입니다.' });
        return;
      }
      if (res.status === 500) {
        setError('nickname', { message: '이미 사용 중인 닉네임입니다.' });
        return;
      }

      if (!res.ok) {
        const errorData = await res.json();
        setError('root', { message: errorData.message || '회원가입에 실패했습니다.' });
        return;
      }

      router.push('/login');
    } catch (error) {
      alert('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (errors.root) {
    alert(errors.root.message);
    return;
  }

  return (
    <div className='mx-auto mt-10 max-w-md'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-10'>
          <Input
            {...register('email')}
            label='이메일'
            type='email'
            placeholder='이메일'
            error={errors.email?.message}
          />
          <Input
            {...register('password')}
            label='비밀번호'
            type='password'
            placeholder='비밀번호'
            error={errors.password?.message}
          />
          <Input
            {...register('passwordConfirmation')}
            type='password'
            placeholder='비밀번호 확인'
            error={errors.passwordConfirmation?.message}
          />
          <Input
            {...register('nickname')}
            label='닉네임'
            type='text'
            placeholder='닉네임'
            error={errors.nickname?.message}
            className={cn('bg-blue-200', !errors.nickname ? 'border-none' : '')}
          />
        </div>
        <Button type='submit' className='mt-6' disabled={isSubmitting || !isValid}>
          가입하기
        </Button>
      </form>
    </div>
  );
}
