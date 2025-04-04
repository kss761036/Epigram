'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import EveryDay from '@/assets/img/landing/EveryDay.svg';
import Button from '@/components/Button';
import Zigzag from './Zigzag';
const slideUpVariants = {
  offscreen: {
    y: 80,
    opacity: 0,
    duration: 0.3,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

export default function CTASection() {
  return (
    <>
      <Zigzag reverse={true} />
      <div className='relative flex h-full flex-col items-center bg-[repeating-linear-gradient(#fff_0_36.69px,#f2f2f2_0_37.69px)]'>
        <motion.div
          variants={slideUpVariants}
          initial='offscreen'
          whileInView='onscreen'
          viewport={{ once: false, amount: 0.5, margin: '300px 0px 0px 0px' }}
          className='mb-[270px] flex flex-col items-center md:mb-[198px] lg:mb-[400px]'
        >
          <Image
            src={EveryDay}
            alt='날마다 에피그램'
            className='mt-[180px] mb-[32px] lg:mt-[420px] lg:mb-[48px] xl:h-[105px] xl:w-[184px]'
            width={122}
            height={70}
          />
          <Link href={'/epigrams'}>
            <Button className='w-[88px] md:w-[112px] lg:w-[286px]'>시작하기</Button>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
