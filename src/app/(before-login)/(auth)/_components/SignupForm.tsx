'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { signUp } from '@/apis/auth/auth.service';
import { SignupFormType, signupFormSchema } from '@/apis/auth/auth.type';
import Button from '@/components/Button';
import FormError from '@/components/FormError';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';
import { cn } from '@/utils/helper';

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupFormSchema),
    mode: 'onChange',
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const isDisabled = isLoading || !isValid;

  const onSubmit = async (data: SignupFormType) => {
    try {
      setIsLoading(true);

      await signUp(data);
      router.replace('/login');
    } catch (error) {
      const errorMessage = isAxiosError(error)
        ? error.response?.status !== 500
          ? error.response?.data.message
          : '중복된 닉네임입니다.'
        : '회원가입 실패';

      router.push(`/signup?error=${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && <FormError message={error} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-8 flex flex-col gap-5 md:gap-10 lg:mb-10'>
          <Input
            {...register('email')}
            label='이메일'
            type='email'
            placeholder='이메일'
            error={errors.email?.message}
          />
          <div className='flex flex-col gap-2.5 md:gap-4'>
            <Input
              {...register('password')}
              label='비밀번호'
              type='password'
              placeholder='비밀번호'
              error={errors.password?.message}
              autoComplete='new-password'
            />
            <Input
              {...register('passwordConfirmation')}
              type='password'
              placeholder='비밀번호 확인'
              error={errors.passwordConfirmation?.message}
            />
          </div>
          <Input
            {...register('nickname')}
            label='닉네임'
            type='text'
            placeholder='닉네임'
            error={errors.nickname?.message}
            className={cn('bg-blue-200', !errors.nickname ? 'border-none' : '')}
          />
        </div>
        <Button type='submit' disabled={isDisabled}>
          {isLoading ? <Spinner /> : '가입하기'}
        </Button>
      </form>
    </>
  );
}
