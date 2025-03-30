import { EpigramDetail } from '@/apis/epigram/epigram.type';
import EtcButton from '@/components/EtcButton';
import Icon from '@/components/Icon';
import { cn } from '@/utils/helper';

interface DeatailFooter
  extends Pick<EpigramDetail, 'referenceTitle' | 'referenceUrl' | 'likeCount' | 'isLiked'> {
  onLike: () => void;
}

export function DeatailFooter({
  referenceUrl,
  referenceTitle,
  isLiked,
  likeCount,
  onLike,
}: DeatailFooter) {
  return (
    <div className='flex items-center justify-center gap-2 lg:gap-4'>
      <EtcButton className={cn('font-medium text-white', isLiked && 'bg-red')} onClick={onLike}>
        <Icon name='like' className='w-5 md:w-9' />
        <span>{likeCount}</span>
      </EtcButton>
      {referenceUrl && (
        <a href={referenceUrl} target='_blank' rel='noopener noreferrer'>
          <EtcButton className='bg-line-100 font-medium text-gray-300'>
            {referenceTitle || '출처'}
            <Icon className='w-5 md:w-9' color='gray-300' name='external' size={20} />
          </EtcButton>
        </a>
      )}
    </div>
  );
}
