import { EpigramDetail } from '@/apis/epigram/epigram.type';
import { MoreMenu, MoreMenuItem } from '@/components/MoreMenu';

interface DetailHeaderProps extends Pick<EpigramDetail, 'tags'> {
  isOwner: boolean;
  onEdit: () => void;
  onRemove: () => void;
}

export function DetailHeader({ tags, isOwner, onEdit, onRemove }: DetailHeaderProps) {
  return (
    <header className='mb-4 flex gap-4 md:mb-6 lg:mb-8'>
      {tags.length > 0 && (
        <ul className='flex flex-wrap gap-4'>
          {tags.map((tag) => (
            <li key={tag.id}>
              <span className='text-blue-400 lg:text-xl'>#{tag.name}</span>
            </li>
          ))}
        </ul>
      )}
      {isOwner && (
        <div className='ml-auto flex-none'>
          <MoreMenu>
            <MoreMenuItem onClick={onEdit}>수정하기</MoreMenuItem>
            <MoreMenuItem onClick={onRemove}>삭제하기</MoreMenuItem>
          </MoreMenu>
        </div>
      )}
    </header>
  );
}
