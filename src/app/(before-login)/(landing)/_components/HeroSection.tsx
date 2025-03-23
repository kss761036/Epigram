'use client';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Zigzag from './Zigzag';
import { motion } from 'motion/react';
import AnimatedText from './AnimatedText';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <>
      <div className='relative mt-[52px] flex h-full flex-col items-center bg-[repeating-linear-gradient(#fff_0_36.69px,#f2f2f2_0_37.69px)] md:mt-[60px] lg:mt-[80px]'>
        <div className='font-iropke flex flex-col text-center'>
          <span className='text-black-500 mt-[200px] text-2xl leading-10 md:mt-[204px] md:text-3xl md:leading-12 lg:text-4xl lg:leading-16'>
            <AnimatedText text='나만 갖고 있기엔' text2='아까운 글이 있지 않나요?' />
          </span>
          <span className='text-black-300 text-md mt-2 md:mt-6 md:text-xl lg:mt-10'>
            다른 사람들과 감정을 공유해 보세요.
          </span>
        </div>
        <div>
          <Link href={'/epigrams'}>
            <Button className='mt-6 w-[112px] md:mt-[32px] lg:mt-[48px] lg:w-[286px]'>
              시작하기
            </Button>
          </Link>
        </div>
        <div className='mt-[168px] mb-[20px] flex flex-col items-center justify-center md:mt-[106px] lg:mt-[214px] lg:mb-[58px]'>
          <span className='text-xs font-semibold text-blue-400 md:text-lg'>더 알아보기</span>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon name='arrowDoubleDown' className='mt-1.5 text-blue-400' />
          </motion.div>
        </div>
      </div>
      <Zigzag />
    </>
  );
}
