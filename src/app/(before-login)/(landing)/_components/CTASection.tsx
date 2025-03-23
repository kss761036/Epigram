'use client';

import Button from '@/components/Button';
import Zigzag from './Zigzag';
import Image from 'next/image';
import EveryDay from '@/assets/img/landing/EveryDay.svg';
import { motion } from 'motion/react';
import Link from 'next/link';
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
          className='flex flex-col items-center'
        >
          <Image
            src={EveryDay}
            alt='날마다 에피그램'
            className='mt-[180px] lg:mt-[420px] xl:h-[105px] xl:w-[184px]'
            width={122}
            height={70}
          />
          <Link href={'/epigrams'}>
            <Button className='mt-[32px] mb-[270px] w-[88px] md:mb-[198px] md:w-[112px] lg:mt-[48px] lg:mb-[400px] lg:w-[286px]'>
              시작하기
            </Button>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
