'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormType, signupFormSchema } from '@/apis/auth/auth.type';
import { cn } from '@/utils/helper';
import Input from '@/components/Input';
import Button from '@/components/Button';
import FormError from '@/components/FormError';
import { signUp } from '@/apis/auth/auth.service';

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupFormSchema),
    mode: 'onBlur',
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const onSubmit = async (data: SignupFormType) => {
    try {
      await signUp(data);
      router.replace('/login');
    } catch (error) {
      const errorMessage = isAxiosError(error) ? error.response?.data.message : '회원가입 실패';
      router.push(`/signup?error=${errorMessage}`);
    }
  };

  return (
    <div className='mx-auto mt-10 max-w-md'>
      {error && <FormError message={error} />}
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
