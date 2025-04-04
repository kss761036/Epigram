'use client';

import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/assets/img/common/logo.svg';
import { useAuth } from '@/hooks/useAuth';
import Icon from '../Icon';

export default function BeforeLoginHeader() {
  const { isAuthenticated } = useAuth();

  return (
    <header className='border-line-100 fixed top-0 left-0 z-50 h-13 w-full border-b bg-white md:h-15.5 lg:h-20'>
      <div className='flex h-full items-center justify-between px-6 md:px-19'>
        <Link href='/search'>
          <Icon name='search' size={20} className='lg:w-[30px]' />
        </Link>
        <h1>
          <Link href='/'>
            <Image src={Logo} alt='epigram' className='h-6.5 w-auto lg:h-9' />
          </Link>
        </h1>
        <Link href={isAuthenticated ? '/mypage' : '/login'}>
          <Icon name='person' size={20} className='lg:w-[30px]' />
        </Link>
      </div>
    </header>
  );
}
