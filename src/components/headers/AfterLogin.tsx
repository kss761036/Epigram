'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/assets/img/common/logo.svg';
import Avatar from '@/components/Avatar';
import Icon from '@/components/Icon';

const MENU_DATA = [
  {
    id: 1,
    label: '메인',
    href: '/epigrams',
  },
  {
    id: 2,
    label: '피드',
    href: '/feeds',
  },
  {
    id: 3,
    label: '검색',
    href: '/search',
  },
];

export default function AfterLoginHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <header className='border-line-100 fixed top-0 left-0 z-50 h-13 w-full border-b bg-white md:h-15.5 lg:h-20'>
        <div className='flex h-full items-center px-6 md:px-19'>
          <button onClick={() => setIsOpen(true)} className='cursor-pointer md:hidden'>
            <Icon name='menu' size={24} color='#C4C4C4' />
          </button>

          <h1 className='ml-2.5'>
            <Link href='/'>
              <Image src={Logo} alt='epigram' className='h-6.5 w-auto lg:h-9' />
            </Link>
          </h1>

          <ul className='ml-6 hidden items-center gap-6 md:flex'>
            {MENU_DATA.map((item) => (
              <li key={item.id}>
                <Link
                  className='text-[14px] leading-relaxed font-semibold'
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className='ml-auto'>
            {session ? (
              <Link href='/mypage' className='flex items-center gap-1.5'>
                <Avatar
                  src={session.user.image}
                  alt={String(session.user.nickname)}
                  className='h-6.5 w-auto text-[12px] leading-none lg:h-9 lg:text-[16px]'
                />
                <span className='text-[13px] leading-none text-gray-300 lg:text-[16px]'>
                  {session.user.nickname}
                </span>
              </Link>
            ) : (
              <Link href='/login' className='text-[14px] leading-relaxed font-semibold'>
                로그인
              </Link>
            )}
          </div>
        </div>
      </header>
      <AnimatePresence mode='wait'>
        {isOpen && (
          <motion.div
            className='fixed top-0 left-0 z-50 h-dvh w-full bg-black/60 md:hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2 } }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className='absolute top-0 h-full w-[60%] min-w-[220px] bg-white'
              initial={{ x: '-100%', transition: { delay: 0.2 } }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className='border-line-100 flex h-13 items-center border-b px-4'>
                <button className='ml-auto' onClick={() => setIsOpen(false)}>
                  <Icon name='close' size={24} />
                </button>
              </div>
              <ul>
                {MENU_DATA.map((item) => (
                  <li key={item.id}>
                    <Link
                      className='block px-5 py-6 text-[16px] leading-relaxed font-medium'
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
