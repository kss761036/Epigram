'use client';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Zigzag from './Zigzag';
import { motion } from 'motion/react';

export default function HeroSection() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='relative mt-[52px] flex h-full flex-col items-center bg-[repeating-linear-gradient(#fff_0_36.69px,#f2f2f2_0_37.69px)] md:mt-[60px] lg:mt-[80px]'
      >
        <motion.div className='font-iropke flex flex-col text-center'>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='text-black-500 mt-[200px] text-2xl leading-10 md:mt-[204px] md:text-3xl md:leading-12 lg:mt-[320px] lg:text-4xl lg:leading-16'
          >
            나만 갖고 있기엔
            <br />
            아까운 글이 있지 않나요?
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='text-black-300 text-md mt-2 md:mt-6 md:text-xl lg:mt-10'
          >
            다른 사람들과 감정을 공유해 보세요.
          </motion.span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Button className='mt-6 w-[112px] md:mt-[32px] lg:mt-[48px] lg:w-[286px]'>
            시작하기
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='mt-[168px] mb-[20px] flex animate-[bounce_0.9s_infinite] flex-col items-center justify-center md:mt-[106px] lg:mt-[214px] lg:mb-[58px]'
        >
          <motion.span className='text-xs font-semibold text-blue-400 md:text-lg'>
            더 알아보기
          </motion.span>
          <motion.div>
            <Icon name='arrowDoubleDown' className='mt-1 text-blue-400' />
          </motion.div>
        </motion.div>
      </motion.div>
      <Zigzag />
    </>
  );
}
