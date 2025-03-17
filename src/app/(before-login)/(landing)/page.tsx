import Icon from '@/components/Icon';
import HeroSection from './_components/HeroSection';
import ServiceSection from './_components/ServiceSection';
import CTASection from './_components/CTASection';

export default function LandingPage() {
  return (
    <>
      <div className='fixed top-0 z-10 w-full border-b-1 border-[#d7d7d7]'>
        <div className='flex h-[52px] items-center justify-between md:h-[60px] lg:h-[80px]'>
          {/*TODO 임시 네비게이션바*/}
          <Icon name='search' />
          <span>Epigram</span>
          <Icon name='person' />
        </div>
      </div>
      <HeroSection />
      <ServiceSection />
      <CTASection />
    </>
  );
}
