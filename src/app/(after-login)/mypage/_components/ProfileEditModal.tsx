'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { createPortal } from 'react-dom';
import { updateUser, uploadImage } from '@/apis/user/user.service';
import { UpdateUserForm, updateUserFormSchema } from '@/apis/user/user.type';
import useModal from '@/hooks/useModal';
import Button from '@/components/Button';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import Input from '@/components/Input';
import UploadPreview from './UploadPreview';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileEditModal({ isOpen, onClose }: ProfileEditModalProps) {
  const { data: session, update } = useSession();
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
      onClose();
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

  const { mounted } = useModal(isOpen, onClose);
  const portalRoot =
    typeof document !== 'undefined' ? document.getElementById('portal-root') : null;

  if (!mounted || !portalRoot) return null;

  return createPortal(
    isOpen ? (
      <div
        className='fixed inset-0 z-100 flex items-center justify-center bg-black/60'
        onClick={onClose}
      >
        <div
          className='w-full max-w-[320px] rounded-3xl bg-white px-[38px] py-8 md:max-w-[372px] lg:max-w-[452px] lg:py-10'
          onClick={(e) => e.stopPropagation()}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='mt-2 flex w-full flex-col justify-center gap-6'
          >
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
                onClick={onClose}
                className='text-black-700 w-full bg-blue-200 font-medium hover:bg-blue-200 focus:ring-0 focus:ring-offset-0 active:border-blue-200 active:bg-blue-200'
              >
                취소
              </Button>
              <Button
                type='submit'
                disabled={isSubmitting || !isDirty || !isValid}
                className='w-full bg-blue-900 hover:bg-blue-950 active:bg-blue-950'
              >
                저장
              </Button>
            </div>
          </form>
        </div>
      </div>
    ) : null,
    portalRoot,
  );
}
