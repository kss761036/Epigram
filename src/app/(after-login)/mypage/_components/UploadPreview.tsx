'use client';

import { ChangeEvent, useEffect } from 'react';
import Avatar from '@/components/Avatar';
import Icon from '@/components/Icon';

interface UploadPreviewProps {
  value: File | string | undefined;
  onChange: (file: File | undefined) => void;
  error?: string;
}

export default function UploadPreview({ value, onChange, error }: UploadPreviewProps) {
  const preview = value instanceof File ? URL.createObjectURL(value) : value;
  useEffect(() => {
    return () => {
      if (preview && value instanceof File) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, value]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const files = e.target.files;
    onChange(files[0]);
  }

  return (
    <div className='flex flex-col items-center'>
      <label className='relative cursor-pointer'>
        <Avatar
          src={preview}
          alt='이미지 업로드'
          className='h-20 w-20 border-2 border-blue-300 text-lg lg:h-[110px] lg:w-[110px] lg:text-2xl'
        />

        <div className='absolute right-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-900 lg:h-9 lg:w-9'>
          <Icon name='camera' className='h-3 w-3 text-white lg:h-4 lg:w-4' />
        </div>
        <input type='file' accept='image/*' onChange={handleChange} className='sr-only' />
      </label>
      {error && <span className='text-red md:text-md mt-2 ml-2 text-xs lg:text-lg'>{error}</span>}
    </div>
  );
}
