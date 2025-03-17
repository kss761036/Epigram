import Button from '@/components/Button';
import Zigzag from './Zigzag';
import Image from 'next/image';
import EveryDayMo from '@/assets/img/landing/EveryDayMo.png';
import EveryDayPC from '@/assets/img/landing/EveryDayPC.png';

export default function CTASection() {
  return (
    <>
      <Zigzag reverse={true} />
      <div className='relative flex h-full flex-col items-center bg-[repeating-linear-gradient(#fff_0_36.69px,#f2f2f2_0_37.69px)]'>
        <Image
          src={EveryDayMo}
          alt='날마다 에피그램'
          className='mt-[180px] lg:mt-[420px]'
          width={122}
          height={70}
        />
        <Button className='mt-[32px] mb-[270px] w-[88px] md:mb-[198px] md:w-[112px] lg:mt-[48px] lg:mb-[400px] lg:w-[286px]'>
          시작하기
        </Button>
      </div>
    </>
  );
}
