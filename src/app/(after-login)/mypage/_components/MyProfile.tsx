'use client';

import { signOut, useSession } from 'next-auth/react';
import Avatar from '@/components/Avatar';
import useModalStore from '@/hooks/useModalStore';
import ProfileEditModal from './ProfileEditModal';

export default function MyProfile() {
  const { data: session } = useSession();
  const { open } = useModalStore();

  return (
    <>
      <div className='relative'>
        <div className='absolute top-[26px] left-1/2 z-3 flex -translate-x-1/2 flex-col items-center lg:top-[68px]'>
          <div className='flex flex-col justify-center gap-4 lg:gap-6'>
            <div className='flex flex-col items-center gap-2 lg:gap-4'>
              {session && (
                <>
                  <div onClick={() => open('ProfileEdit')} className='cursor-pointer'>
                    <Avatar
                      src={session.user?.image ?? undefined}
                      alt={session.user?.nickname}
                      className='h-20 w-20 border-2 border-blue-300 text-xl lg:h-[120px] lg:w-[120px] lg:text-3xl'
                    />
                  </div>
                  <p className='text-black-950 text-lg font-medium lg:text-2xl'>
                    {session.user?.nickname}
                  </p>
                </>
              )}
            </div>
            <button
              onClick={() => signOut()}
              className='bg-line-100 text-md cursor-pointer rounded-[100px] px-3.5 py-1.5 text-gray-300 lg:px-4 lg:py-2 lg:text-xl lg:font-medium'
            >
              로그아웃
            </button>
          </div>
        </div>

        <ProfileEditModal />
      </div>
    </>
  );
}
