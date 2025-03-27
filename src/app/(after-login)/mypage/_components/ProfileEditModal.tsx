'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { createPortal } from 'react-dom';
import { updateUser, uploadImage } from '@/apis/user/user.service';
import { updateUserFormSchema } from '@/apis/user/user.type';
import Avatar from '@/components/Avatar';
import Icon from '@/components/Icon';
import useModal from '@/hooks/useModal';
import Button from '@/components/Button';
import { toast } from 'react-toastify';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileEditModal({ isOpen, onClose }: ProfileEditModalProps) {
  const { data: session, update } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nickname, setNickname] = useState(session?.user?.nickname ?? '');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(session?.user?.image ?? null);

  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setNickname(session?.user?.nickname ?? '');
      setImage(null);
      setImagePreview(session?.user?.image ?? null);
    }
  }, [isOpen, session]);

  const handleImageClick = () => {
    if (isImageUploading) return;
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      console.log('이미지 선택됨:', file);

      try {
        setIsImageUploading(true);
        const uploadedImage = await uploadImage({ image: file });
        setImagePreview(uploadedImage.url);
      } catch (error) {
        toast.error('이미지 업로드에 실패했습니다.');
      } finally {
        setIsImageUploading(false);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setIsUpdating(true);

      const validation = updateUserFormSchema.safeParse({ nickname, image });
      if (!validation.success) {
        validation.error.errors.forEach((error) => {
          toast.error(error.message);
        });
        return;
      }

      const updateData: { nickname: string; image?: string } = { nickname };

      if (imagePreview && imagePreview !== session?.user?.image) {
        updateData.image = imagePreview;
      }

      console.log('업데이트 요청 데이터:', updateData);

      await updateUser(updateData);
      await update({ nickname, image });

      toast.success('프로필이 수정되었습니다.');
      onClose();
    } catch (error) {
      toast.error('프로필 수정에 실패했습니다.');
    } finally {
      setIsUpdating(false);
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
          <div className='mt-2 flex flex-col items-center justify-center gap-6'>
            <div onClick={handleImageClick} className='relative cursor-pointer'>
              <Avatar
                src={session?.user?.image ?? undefined}
                alt={nickname}
                className='h-20 w-20 border-2 border-blue-300 text-lg lg:h-[110px] lg:w-[110px] lg:text-2xl'
              />
              <div className='absolute right-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-900 lg:h-9 lg:w-9'>
                <Icon name='camera' className='h-3 w-3 text-white lg:h-4 lg:w-4' />
              </div>
            </div>
            <input
              type='file'
              accept='image/*'
              ref={fileInputRef}
              onChange={handleImageChange}
              className='hidden'
            />

            <input
              type='text'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder='닉네임을 입력하세요'
              className='text-black-950 outline-black-600 mt-2 h-[44px] w-full rounded-xl border border-blue-300 bg-blue-200 pl-4 text-lg placeholder:text-blue-400 lg:h-[64px] lg:text-xl'
            />

            <div className='flex w-full flex-row gap-2 lg:gap-4'>
              <Button
                onClick={onClose}
                className='text-black-700 w-full bg-blue-200 font-medium hover:bg-blue-200 focus:ring-0 focus:ring-offset-0 active:border-blue-200 active:bg-blue-200'
              >
                취소
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isUpdating || isImageUploading}
                className='w-full bg-blue-900 hover:bg-blue-950 active:bg-blue-950'
              >
                저장
              </Button>
            </div>
          </div>
        </div>
      </div>
    ) : null,
    portalRoot,
  );
}
