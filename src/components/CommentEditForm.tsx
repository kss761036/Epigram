import { Comment } from '@/apis/comment/comment.type';
import Avatar from './Avatar';
import Button from './Button';
import Toggle from './Toggle';

interface CommentEditFormProps {
  comment: Comment;
  editedContent: string;
  setEditedContent: React.Dispatch<React.SetStateAction<string>>;
  isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdatePending: boolean;
  handleSaveEdit: () => void;
  handleCancelEdit: () => void;
}

export default function CommentEditForm({
  comment,
  editedContent,
  setEditedContent,
  isPrivate,
  setIsPrivate,
  isUpdatePending,
  handleSaveEdit,
  handleCancelEdit,
}: CommentEditFormProps) {
  return (
    <div className='border-line-200 flex items-start border-t px-6 py-4 text-left md:py-6 lg:py-9'>
      <Avatar src={comment.writer.image} alt={comment.writer.nickname} />
      <div className='ml-4 flex flex-1 flex-col gap-2 lg:gap-4'>
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className='border-black-600 text-md text-black-700 w-full resize-none rounded-lg border px-4 py-3 md:text-lg lg:text-xl'
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
