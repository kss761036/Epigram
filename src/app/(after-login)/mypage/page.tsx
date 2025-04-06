import Inner from '@/components/Inner';
import MyEmotions from './_components/MyEmotions';
import MyProfile from './_components/MyProfile';
import MyWritings from './_components/MyWritings';

export default function Page() {
  return (
    <>
      <MyProfile />
      <div className='bg-bg pt-16 lg:pt-32'>
        <div className='rounded-3xl bg-blue-100 pt-[184px] pb-10 shadow-[0px_0px_36px_0px_rgba(0,_0,_0,_0.05)] md:pb-[63px] lg:pt-[276px] lg:pb-[88px]'>
          <Inner>
            <MyEmotions />
          </Inner>
        </div>
        <Inner className='mt-14 pb-[114px] md:pb-[233px] lg:mt-24 lg:pb-72'>
          <MyWritings />
        </Inner>
      </div>
    </>
  );
}
