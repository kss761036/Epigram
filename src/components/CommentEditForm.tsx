import { Comment } from '@/apis/comment/comment.type';
import Avatar from './Avatar';
import Button from './Button';
import Toggle from './Toggle';
import { cn } from '@/utils/helper';

interface CommentEditFormProps {
  comment?: Comment;
  writer?: { image: string; nickname: string };
  editedContent: string;
  setEditedContent: React.Dispatch<React.SetStateAction<string>>;
  isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdatePending: boolean;
  handleSaveEdit: () => void;
  handleCancelEdit: () => void;
  className?: string;
}

export default function CommentEditForm({
  comment,
  writer,
  editedContent,
  setEditedContent,
  isPrivate,
  setIsPrivate,
  isUpdatePending,
  handleSaveEdit,
  handleCancelEdit,
  className,
}: CommentEditFormProps) {
  const resolvedWriter = comment?.writer ?? writer;

  if (!resolvedWriter) {
    return null;
  }

  return (
    <div
      className={cn(
        'border-line-200 flex items-start border-t px-6 py-4 text-left md:py-6 lg:py-9',
        className,
      )}
    >
      <Avatar src={resolvedWriter.image} alt={resolvedWriter.nickname} />
      <div className='ml-4 flex flex-1 flex-col gap-2 lg:gap-4'>
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          placeholder='100자 이내로 입력해 주세요.'
          className='border-black-600 text-md text-black-700 w-full resize-none rounded-lg border px-4 py-3 placeholder-blue-400 md:text-lg lg:text-xl'
        />
        <div className='flex items-center justify-between'>
          <Toggle
            label='공개'
            checked={!isPrivate}
            onChange={() => setIsPrivate((prev) => !prev)}
          />
          <div className='flex gap-2'>
            <Button
              size='xs'
              onClick={handleSaveEdit}
              disabled={isUpdatePending}
              className='focus:ring-0 focus:ring-offset-0'
            >
              저장
            </Button>
            <Button
              size='xs'
              onClick={handleCancelEdit}
              className='text-black-700 bg-blue-200 hover:bg-blue-200 focus:ring-0 focus:ring-offset-0 active:border-blue-200 active:bg-blue-200'
            >
              취소
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
