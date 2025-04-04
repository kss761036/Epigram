'use client';

import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import IconButton from '@/components/IconButton';

const MotionLink = motion(Link);

export default function FloatingButtons() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 0);
  });

  const handleGoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='fixed right-[calc(env(safe-area-inset-right)+24px)] bottom-[calc(env(safe-area-inset-bottom)+120px)] z-50 lg:right-19 lg:bottom-20'>
      <div className='flex flex-col items-end gap-2'>
        <MotionLink
          layout
          href='/epigrams/create'
          className='text-md flex h-12 items-center justify-center gap-1 rounded-full bg-blue-900 pr-3.5 pl-2.5 font-semibold text-white lg:h-16 lg:pr-5 lg:pl-4 lg:text-xl'
        >
          <Icon size={22} name='plus' />
          에피그램 만들기
        </MotionLink>
        {isScrolled && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, duration: 0.3 }}
            layout
          >
            <IconButton variant='arrowUp' onClick={handleGoTop} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
