'use client';

import MyProfile from './_components/MyProfile';
import TodayMood from '@/components/TodayMood';
import MonthlyLogs from './_components/MonthlyLogs';
import MyWritings from './_components/MyWritings';
import { format } from 'date-fns';

export default function Page() {
  const today = format(new Date(), 'yyyy.MM.dd');

  return (
    <>
      <MyProfile />
      <div className='bg-bg pt-16 lg:pt-32'>
        <div className='rounded-3xl bg-blue-100 pt-[184px] pb-10 shadow-[0px_0px_36px_0px_rgba(0,_0,_0,_0.05)] md:pb-[63px] lg:pt-[276px] lg:pb-[88px]'>
          <div className='mx-auto w-full max-w-[312px] md:max-w-[384px] lg:max-w-[640px]'>
            <div className='flex justify-between'>
              <p className='text-black-600 text-lg font-semibold lg:text-2xl'>오늘의 감정</p>
              <span className='text-lg text-blue-400 lg:text-xl'>{today}</span>
            </div>
            <TodayMood />

            <MonthlyLogs />
          </div>
        </div>
        <div className='mx-auto mt-14 w-full max-w-[312px] pb-[114px] md:max-w-[384px] md:pb-[233px] lg:mt-24 lg:max-w-[640px] lg:pb-72'>
          <MyWritings />
        </div>
      </div>
    </>
  );
}
