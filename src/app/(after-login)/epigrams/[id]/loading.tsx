import Spinner from '@/components/Spinner';

export default function loading() {
  return (
    <div className='bg-bg flex min-h-dvh'>
      <div className='absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 p-4 text-center text-blue-400'>
        <Spinner className='fill-black text-gray-100' />
        에피그램을 가져오는 중입니다.
      </div>
    </div>
  );
}
