import Image from 'next/image';
import SectionImg1 from '@/assets/img/landing/sectionImg1.png';
import SectionImg2 from '@/assets/img/landing/sectionImg2.png';
import SectionImg3 from '@/assets/img/landing/sectionImg3.png';
import SectionImg4 from '@/assets/img/landing/sectionImg4.png';
import { motion } from 'motion/react';

export default function ServiceSection() {
  return (
    <>
      <div className='bg-bg relative h-full'>
        <div className='flex flex-col items-center justify-center pt-[124px] lg:pt-[240px]'>
          {/*Section1*/}
          <div className='flex flex-col gap-[40px] lg:flex-row lg:gap-[80px]'>
            <Image src={SectionImg1} alt='서비스 소개 이미지' width={312} height={210} />
            <div>
              <span className='text-black-950 text-2xl font-bold lg:text-3xl'>
                명언이나 글귀,
                <br />
                토막 상식들을 공유해 보세요.
              </span>
              <div className='mt-4 flex flex-col text-lg text-blue-600 md:flex-row lg:flex-col lg:text-2xl'>
                <span>나만 알던 소중한 글들을&nbsp;</span>
                <span>다른 사람들에게 전파하세요.</span>
              </div>
            </div>
          </div>
          {/*Section2*/}
          <div className='mt-[196px] flex flex-col gap-[40px] md:mt-[220px] lg:mt-[380px] lg:flex-row-reverse lg:gap-[80px]'>
            <Image src={SectionImg2} alt='서비스 소개 이미지' width={312} height={210} />
            <div className='flex flex-col'>
              <span className='text-black-950 text-right text-2xl font-bold lg:text-3xl'>
                감정 상태에 따라,
                <br />
                알맞은 위로를 받을 수 있어요.
              </span>
              <span className='mt-4 text-right text-lg text-blue-600 lg:text-2xl'>
                태그를 통해 글을 모아 볼 수 있어요.
              </span>
            </div>
          </div>
          {/*Section3*/}
          <div className='mt-[196px] flex flex-col gap-[40px] md:mt-[220px] lg:mt-[380px] lg:flex-row lg:gap-[80px]'>
            <Image src={SectionImg3} alt='서비스 소개 이미지' width={312} height={210} />
            <div>
              <span className='text-black-950 text-2xl font-bold lg:text-3xl'>
                내가 요즘 어떤 감정 상태인지
                <br />
                통계로 한눈에 볼 수 있어요.
              </span>
              <div className='mt-4 flex flex-col text-lg text-blue-600 md:flex-row lg:flex-col lg:text-2xl'>
                <span>감정 달력으로 내 마음에 담긴&nbsp;</span>
                <span>감정을 확인해보세요</span>
              </div>
            </div>
          </div>
          {/*Section4*/}
          <div className='mt-[280px] mb-[22px] flex flex-col text-center md:mb-[30px] lg:mt-[480px] lg:mb-[60px]'>
            <span className='text-black-950 text-2xl font-bold lg:text-3xl'>
              사용자들이 직접
              <br />
              인용한 에피그램들
            </span>
            <Image
              src={SectionImg4}
              alt='서비스 소개 이미지'
              width={312}
              height={576}
              className='mt-10 lg:mt-[100px]'
            />
          </div>
        </div>
      </div>
    </>
  );
}
