'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/img/common/logo.svg';

export default function AuthHeader() {
  return (
    <header className='border-line-100 fixed top-0 left-0 z-50 flex h-13 w-full items-center justify-center border-b bg-white md:h-15.5 lg:h-20'>
      <h1>
        <Link href='/'>
          <Image src={Logo} alt='epigram' className='h-6.5 w-auto lg:h-9' />
        </Link>
      </h1>
    </header>
  );
}
