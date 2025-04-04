'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Epigram } from '@/apis/epigram/epigram.type';
import emptyImg from '@/assets/img/empty.png';
import Card from '@/components/Card';
import EtcButton from '@/components/EtcButton';
import Icon from '@/components/Icon';
import Spinner from '@/components/Spinner';

interface MyEpigramsProps {
  epigrams: Epigram[];
  isFetching: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export default function MyEpigrams({
  epigrams,
  isFetching,
  hasNextPage,
  fetchNextPage,
}: MyEpigramsProps) {
  const router = useRouter();

  const isShowLoader = isFetching;
  const isShowMoreTrigger = !isFetching && hasNextPage;
  const isShowEmpty = !epigrams.length && !isFetching;
  const isShowEnd = !isFetching && !hasNextPage && !isShowEmpty;

  return (
    <>
      <ul className='flex flex-col gap-6'>
        {epigrams.map((epigram) => (
          <li key={epigram.id}>
            <Card {...epigram} />
          </li>
        ))}
      </ul>

      {isShowEmpty && (
        <div className='flex flex-col items-center justify-center'>
          <Image
            src={emptyImg}
            alt='아직 작성한 에피그램이 없음을 나타내는 이미지'
            width={200}
            height={200}
            className='mt-[38px] h-24 w-24 lg:mt-[76px] lg:h-36 lg:w-36'
          />
          <span className='text-black-600 text-md mt-2 mb-8 text-center md:mt-4 md:mb-10 lg:mt-6 lg:mb-12 lg:text-xl'>
            아직 작성한 에피그램이 없어요!
            <br />
            에피그램을 작성하고 감정을 공유해 보세요.
          </span>
          <EtcButton
            variant='outlined'
            onClick={() => router.push('/epigrams/create')}
            size='lg'
            className='text-black-400 border-gray-100 font-medium md:text-[14px] lg:text-[20px]'
          >
            에피그램 만들기
          </EtcButton>
        </div>
      )}

      {isShowLoader && (
        <div className='flex flex-col items-center justify-center gap-4 p-4 text-center text-blue-400'>
          <Spinner className='fill-black text-gray-100' />
          에피그램을 불러오는 중입니다.
        </div>
      )}

      {isShowEnd && (
        <div className='flex items-center justify-center p-10 text-gray-500'>
          모든 에피그램을 불러왔습니다.
        </div>
      )}

      {isShowMoreTrigger && (
        <div className='flex items-center justify-center p-8'>
          <EtcButton variant='outlined' onClick={fetchNextPage} size='lg'>
            <Icon name='plus' /> 내 에피그램 더보기
          </EtcButton>
        </div>
      )}
    </>
  );
}
