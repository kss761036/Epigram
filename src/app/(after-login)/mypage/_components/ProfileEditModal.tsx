'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { updateUser, uploadImage } from '@/apis/user/user.service';
import { UpdateUserForm, updateUserFormSchema } from '@/apis/user/user.type';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ModalBase from '@/components/ModalBase';
import useModalStore from '@/hooks/useModalStore';
import UploadPreview from './UploadPreview';

export default function ProfileEditModal() {
  const { data: session, update } = useSession();
  const { isOpen, close, type } = useModalStore();

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting, isDirty, isValid, errors },
  } = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserFormSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    if (session?.user) {
      reset({
        nickname: session.user.nickname,
        image: session.user.image,
      });
    }
  }, [reset, session]);

  const onSubmit = async ({ nickname, image }: UpdateUserForm) => {
    try {
      let uploadedImageUrl: string | undefined;

      if (image instanceof File) {
        const { url } = await uploadImage({ image });
        uploadedImageUrl = url;
      }

      const updateData = {
        nickname,
        ...(uploadedImageUrl && { image: uploadedImageUrl }),
      };

      const result = await updateUser(updateData);
      await update({ nickname: result.nickname, image: result.image });

      toast.success('프로필이 성공적으로 수정되었어요!');
      close();
    } catch (error) {
      let message = '문제가 발생했습니다.';

      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          message = '이미 사용 중인 닉네임입니다.';
        } else {
          message = error.response?.data.message || message;
        }
      }

      toast.error(message);
    }
  };

  if (!isOpen || type !== 'ProfileEdit') return null;

  return (
    <ModalBase titleId='profile-edit-modal-title'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mt-2 flex w-full flex-col justify-center gap-6'
      >
        <h2 id='profile-edit-modal-title' className='sr-only'>
          프로필 수정
        </h2>

        <Controller
          name='image'
          control={control}
          render={({ field, fieldState }) => (
            <UploadPreview
              value={field.value || undefined}
              onChange={(file) => {
                field.onChange(file);
                field.onBlur();
              }}
              error={fieldState.error?.message}
            />
          )}
        />
        <Input
          type='text'
          {...register('nickname')}
          error={errors.nickname?.message}
          placeholder='닉네임을 입력하세요'
          variant='filled'
          className='mt-2 w-full border border-blue-300'
        />

        <div className='flex w-full flex-row gap-2 lg:gap-4'>
          <Button
            type='button'
            onClick={close}
            className='text-black-700 w-full bg-blue-200 font-medium hover:bg-blue-200 active:border-blue-200 active:bg-blue-200'
          >
            취소
          </Button>
          <Button
            type='submit'
            disabled={isSubmitting || !isDirty || !isValid}
            className='w-full bg-blue-900 hover:bg-blue-950 focus:ring-black active:bg-blue-950'
          >
            저장
          </Button>
        </div>
      </form>
    </ModalBase>
  );
}
