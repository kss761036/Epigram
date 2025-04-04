'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { Comment } from '@/apis/comment/comment.type';
import { CommentFormValues } from '@/apis/epigram/epigram.type';
import { cn } from '@/utils/helper';
import Avatar from './Avatar';
import Button from './Button';
import Toggle from './Toggle';

interface CommentFormProps {
  comment?: Comment;
  writer?: { image: string; nickname: string };
  isUpdatePending: boolean;
  handleSaveEdit: () => void;
  handleCancelEdit: () => void;
  className?: string;
}

export default function CommentForm({
  comment,
  writer,
  isUpdatePending,
  handleSaveEdit,
  handleCancelEdit,
  className,
}: CommentFormProps) {
  const resolvedWriter = comment?.writer ?? writer;
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CommentFormValues>();

  if (!resolvedWriter) return null;

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
          {...register('content')}
          placeholder='100자 이내로 입력해 주세요.'
          className='border-black-600 text-md text-black-700 w-full resize-none rounded-lg border px-4 py-3 placeholder-blue-400 md:text-lg lg:text-xl'
        />
        <div className='flex items-center justify-between'>
          <Controller
            name='isPrivate'
            control={control}
            render={({ field }) => (
              <Toggle
                label='공개'
                checked={!field.value}
                onChange={() => field.onChange(!field.value)}
              />
            )}
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
