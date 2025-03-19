'use client';

import SectionImg1Mo from '@/assets/img/landing/SectionImg1Mo.svg';
import SectionImg1Tab from '@/assets/img/landing/SectionImg1Tab.svg';
import SectionImg1PC from '@/assets/img/landing/SectionImg1PC.svg';
import SectionImg2Mo from '@/assets/img/landing/SectionImg2Mo.svg';
import SectionImg2Tab from '@/assets/img/landing/SectionImg2Tab.svg';
import SectionImg2PC from '@/assets/img/landing/SectionImg2PC.svg';
import SectionImg3Mo from '@/assets/img/landing/SectionImg3Mo.svg';
import SectionImg3Tab from '@/assets/img/landing/SectionImg3Tab.svg';
import SectionImg3PC from '@/assets/img/landing/SectionImg3PC.svg';
import SectionImg4Mo from '@/assets/img/landing/SectionImg4Mo.svg';
import SectionImg4Tab from '@/assets/img/landing/SectionImg4Tab.svg';
import SectionImg4PC from '@/assets/img/landing/SectionImg4PC.svg';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function ServiceSection() {
  const slideRightVariants = {
    offscreen: {
      x: 80,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
  };

  const slideLeftVariants = {
    offscreen: {
      x: -80,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
  };

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
        duration: 0.7,
      },
    },
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDesktopMedia = useMediaQuery({ query: '(min-width: 1280px)' });
  const isTabletMedia = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1279px)' });
  const isDesktop = mounted && isDesktopMedia;
  const isTablet = mounted && isTabletMedia;
  return (
    <>
      <div className='bg-bg relative h-full'>
        <div className='flex flex-col items-center justify-center pt-[124px] xl:pt-[240px]'>
          {/*Section1*/}
          <motion.div
            variants={slideRightVariants}
            initial='offscreen'
            whileInView='onscreen'
            viewport={{ once: false, amount: 0.5, margin: '200px 0px 0px 0px' }}
            className='flex flex-col gap-[40px] xl:flex-row xl:gap-[80px]'
          >
            {isDesktop ? (
              <Image src={SectionImg1PC} alt='서비스 소개 이미지' width={744} height={388} />
            ) : isTablet ? (
              <Image src={SectionImg1Tab} alt='서비스 소개 이미지' width={384} height={240} />
            ) : (
              <Image src={SectionImg1Mo} alt='서비스 소개 이미지' width={312} height={210} />
            )}
            <div className='xl:self-end'>
              <span className='text-black-950 text-2xl font-bold xl:text-3xl'>
                명언이나 글귀,
                <br />
                토막 상식들을 공유해 보세요.
              </span>
              <div className='mt-4 flex flex-col text-lg text-blue-600 md:flex-row xl:flex-col xl:text-2xl'>
                <span>나만 알던 소중한 글들을&nbsp;</span>
                <span>다른 사람들에게 전파하세요.</span>
              </div>
            </div>
          </motion.div>
          {/*Section2*/}
          <motion.div
            variants={slideLeftVariants}
            initial='offscreen'
            whileInView='onscreen'
            viewport={{ once: false, amount: 0.5, margin: '200px 0px 0px 0px' }}
            className='mt-[196px] flex flex-col gap-[40px] md:mt-[220px] xl:mt-[380px] xl:flex-row-reverse xl:gap-[80px]'
          >
            {isDesktop ? (
              <Image src={SectionImg2PC} alt='서비스 소개 이미지' width={744} height={388} />
            ) : isTablet ? (
              <Image src={SectionImg2Tab} alt='서비스 소개 이미지' width={384} height={240} />
            ) : (
              <Image src={SectionImg2Mo} alt='서비스 소개 이미지' width={312} height={210} />
            )}
            <div className='flex flex-col xl:self-end'>
              <span className='text-black-950 text-right text-2xl font-bold xl:text-3xl'>
                감정 상태에 따라,
                <br />
                알맞은 위로를 받을 수 있어요.
              </span>
              <span className='mt-4 text-right text-lg text-blue-600 xl:text-2xl'>
                태그를 통해 글을 모아 볼 수 있어요.
              </span>
            </div>
          </motion.div>
          {/*Section3*/}
          <motion.div
            variants={slideRightVariants}
            initial='offscreen'
            whileInView='onscreen'
            viewport={{ once: false, amount: 0.5, margin: '200px 0px 0px 0px' }}
            className='mt-[196px] flex flex-col gap-[40px] md:mt-[220px] xl:mt-[380px] xl:flex-row xl:gap-[80px]'
          >
            {isDesktop ? (
              <Image src={SectionImg3PC} alt='서비스 소개 이미지' width={744} height={388} />
            ) : isTablet ? (
              <Image src={SectionImg3Tab} alt='서비스 소개 이미지' width={384} height={240} />
            ) : (
              <Image src={SectionImg3Mo} alt='서비스 소개 이미지' width={312} height={210} />
            )}
            <div className='xl:self-end'>
              <span className='text-black-950 text-2xl font-bold xl:text-3xl'>
                내가 요즘 어떤 감정 상태인지
                <br />
                통계로 한눈에 볼 수 있어요.
              </span>
              <div className='mt-4 flex flex-col text-lg text-blue-600 md:flex-row xl:flex-col xl:text-2xl'>
                <span>감정 달력으로 내 마음에 담긴&nbsp;</span>
                <span>감정을 확인해보세요</span>
              </div>
            </div>
          </motion.div>
          {/*Section4*/}
          <motion.div
            variants={slideUpVariants}
            initial='offscreen'
            whileInView='onscreen'
            viewport={{ once: false, amount: 0.3, margin: '200px 0px 0px 0px' }} // 마진말고 다른
            className='mt-[280px] mb-[22px] flex flex-col gap-[40px] text-center md:mb-[30px] xl:mt-[480px] xl:mb-[60px] xl:gap-[80px]'
          >
            <span className='text-black-950 text-2xl font-bold xl:text-3xl'>
              사용자들이 직접
              <br />
              인용한 에피그램들
            </span>
            {isDesktop ? (
              <Image src={SectionImg4PC} alt='서비스 소개 이미지' width={640} height={864} />
            ) : isTablet ? (
              <Image src={SectionImg4Tab} alt='서비스 소개 이미지' width={384} height={792} />
            ) : (
              <Image src={SectionImg4Mo} alt='서비스 소개 이미지' width={312} height={576} />
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
