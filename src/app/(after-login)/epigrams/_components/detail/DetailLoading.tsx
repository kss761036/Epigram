import Spinner from '@/components/Spinner';

export function DetailLoading() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 p-10 pt-24 text-center text-blue-400'>
      <Spinner className='fill-black text-gray-100' />
      게시물을 가져오는 중입니다.
    </div>
  );
}
