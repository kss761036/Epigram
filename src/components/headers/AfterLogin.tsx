'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useMediaQuery } from 'react-responsive';
import { cn } from '@/utils/helper';
import Icon from '../Icon';
import Avatar from '../Avatar';
import Logo from '@/assets/img/common/logo.svg';

const AfterLoginHeader: React.FC = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const isTabletMedia = useMediaQuery({ query: '(min-width: 768px)' });
  const isTablet = mounted && isTabletMedia;

  const headerWrapper =
    'border-line-100 fixed top-0 left-0 z-50 h-13 w-full border-b bg-white md:h-15.5 lg:h-20';
  const menuText = 'text-[14px] leading-relaxed font-semibold';
  const menuBoxText = 'text-[16px] leading-relaxed font-medium block px-5 py-6';

  const menuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const [delayedClasses, setDelayedClasses] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      const timer = setTimeout(() => setDelayedClasses(true), 0);
      return () => clearTimeout(timer);
    } else {
      setDelayedClasses(false);
    }
  }, [menuOpen]);

  const openBack = delayedClasses && 'opacity-60';
  const openBox = delayedClasses && 'translate-x-0';

  return (
    <header className={cn(headerWrapper)}>
      <div className='flex h-full items-center px-6 md:px-19'>
        {isTablet ? (
          <>
            <h1 className='ml-2.5'>
              <Link href='/'>
                <Image src={Logo} alt='epigram' className='h-6.5 w-auto lg:h-9' />
              </Link>
            </h1>
            <ul className='ml-6 flex items-center gap-6'>
              <li>
                <Link className={cn(menuText)} href='/epigrams'>
                  메인
                </Link>
              </li>
              <li>
                <Link className={cn(menuText)} href='/feeds'>
                  피드
                </Link>
              </li>
              <li>
                <Link className={cn(menuText)} href='/search'>
                  검색
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <>
            <button onClick={menuToggle}>
              <Icon name='menu' size={24} color='#C4C4C4' />
            </button>
            <h1 className='ml-2.5'>
              <Link href='/'>
                <Image src={Logo} alt='epigram' className='h-6.5 w-auto lg:h-9' />
              </Link>
            </h1>
            {menuOpen && (
              <div className={cn('fixed top-0 left-0 z-50 h-[100dvh] w-full')}>
                <div
                  className={cn(
                    'bg-black-900 absolute top-0 right-0 bottom-0 left-0 z-51 opacity-0 transition-all duration-300',
                    openBack,
                  )}
                  onClick={menuToggle}
                ></div>
                <div
                  className={cn(
                    'absolute top-0 z-52 h-full w-[61.1111%] min-w-[220px] -translate-x-full bg-white transition-all delay-100 duration-300',
                    openBox,
                  )}
                >
                  <div className='border-line-100 flex h-13 items-center border-b px-4'>
                    <button className='ml-auto' onClick={menuToggle}>
                      <Icon name='close' size={24} />
                    </button>
                  </div>
                  <ul>
                    <li>
                      <Link className={menuBoxText} href='/epigrams'>
                        메인
                      </Link>
                    </li>
                    <li>
                      <Link className={menuBoxText} href='/feeds'>
                        피드
                      </Link>
                    </li>
                    <li>
                      <Link className={menuBoxText} href='/search'>
                        검색
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
        <Link href='/mypage' className='ml-auto flex items-center gap-1.5'>
          {session && (
            <>
              <Avatar
                src={session?.user?.image ?? undefined}
                alt={String(session?.user?.nickname)}
                className='h-6.5 w-auto text-[12px] leading-none lg:h-9 lg:text-[16px]'
              />
              <span className='text-[13px] leading-none text-gray-300 lg:text-[16px]'>
                {String(session?.user?.nickname)}
              </span>
            </>
          )}
        </Link>
      </div>
    </header>
  );
};

export default AfterLoginHeader;
