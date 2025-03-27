interface SkeletonProps {
  className?: string;
}

export function EpigramsSkeleton({ className }: SkeletonProps) {
  return (
    <div className={className}>
      <div className='mt-[24px] h-[120px] w-full animate-pulse rounded-[8px] bg-gray-100 md:h-[146px] lg:mt-[40px] lg:h-[148px]' />
      <div className='flex flex-row-reverse gap-[8px]'>
        <div className='right-0 mt-[8px] h-[26px] w-[120px] animate-pulse rounded-[8px] bg-gray-100' />
        <div className='right-0 mt-[8px] h-[26px] w-[120px] animate-pulse rounded-[8px] bg-gray-100' />
      </div>
    </div>
  );
}

export function TodayMoodSkeleton({ className }: SkeletonProps) {
  return (
    <div className={className}>
      <div className='mt-[24px] h-[84px] w-full animate-pulse rounded-[8px] bg-gray-100 md:h-[96px] lg:mt-[40px] lg:h-[136px]' />
    </div>
  );
}

export function CommentSkeleton({ className }: SkeletonProps) {
  return (
    <div className={className}>
      <div className='mt-[32px] flex gap-[16px]'>
        <div className='h-[48px] w-[48px] animate-pulse rounded-full bg-gray-100' />
        <div className='flex flex-col gap-[8px] md:gap-[12px] lg:gap-[16px]'>
          <div className='h-[18px] w-[66px] animate-pulse rounded-[8px] bg-gray-100 md:w-[80px] lg:w-[90px]' />
          <div className='h-[15px] w-[240px] animate-pulse rounded-[8px] bg-gray-100 md:w-[272px] lg:w-[528px]' />
          <div className='h-[15px] w-[240px] animate-pulse rounded-[8px] bg-gray-100 md:w-[272px] lg:w-[528px]' />
        </div>
      </div>
    </div>
  );
}
