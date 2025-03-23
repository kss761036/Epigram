'use client';

import { useState, useEffect } from 'react';
import TextArea from '@/components/TextArea';
import Input from '@/components/Input';
import Radio from '@/components/Radio';
import Chip from '@/components/Chip';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { cn } from '@/utils/helper';
import {
  AUTHOR_RADIO,
  baseEpigramSchema,
  createEpigramFormSchema,
  CreateEpigramFormType,
} from '@/apis/epigram/epigram.type';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface EpigramFormProps {
  mode: 'create' | 'edit';
  initValues?: Partial<CreateEpigramFormType>;
  onSubmit: (data: CreateEpigramFormType) => void;
  isSubmitting?: boolean;
}

const singleTagSchema = z
  .string()
  .trim()
  .nonempty({ message: '태그를 작성해주세요.' })
  .max(10, { message: '10자 이하로 작성해주세요.' });

const fullTagsSchema = baseEpigramSchema.shape.tags;

export default function EpigramForm({
  mode,
  initValues,
  onSubmit,
  isSubmitting = false,
}: EpigramFormProps) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateEpigramFormType>({
    mode: 'all',
    resolver: zodResolver(createEpigramFormSchema),
    defaultValues: {
      content: initValues?.content || '',
      selectedAuthor: (initValues?.author && ['본인', '알 수 없음'].includes(initValues.author)
        ? initValues.author
        : '직접 입력') as '직접 입력' | '본인' | '알 수 없음',
      author:
        initValues?.author && !['본인', '알 수 없음'].includes(initValues.author)
          ? initValues.author
          : null,

      referenceUrl: initValues?.referenceUrl ?? null,
      referenceTitle: initValues?.referenceTitle ?? null,
      tags: initValues?.tags || [],
    },
  });

  const [tagInput, setTagInput] = useState('');
  const [tagError, setTagError] = useState<string | null>(null);
  const selectedAuthor = watch('selectedAuthor');

  useEffect(() => {
    if (selectedAuthor !== '직접 입력') {
      setValue('author', '');
    }
  }, [selectedAuthor, setValue]);

  const handleFormSubmit = (data: CreateEpigramFormType) => {
    const finalAuthor =
      data.selectedAuthor === '직접 입력' ? data.author?.trim() || '' : data.selectedAuthor;

    const payload: CreateEpigramFormType = {
      ...data,
      author: finalAuthor,
      selectedAuthor: undefined,
      referenceUrl:
        data.referenceUrl && data.referenceUrl.trim() !== '' ? data.referenceUrl : undefined,
      referenceTitle:
        data.referenceTitle && data.referenceTitle.trim() !== '' ? data.referenceTitle : undefined,
    };

    onSubmit(payload);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || e.nativeEvent.isComposing) return;

    e.preventDefault();

    const singleResult = singleTagSchema.safeParse(tagInput);
    if (!singleResult.success) {
      setTagError(singleResult.error.errors[0].message);
      return;
    }

    const trimmed = singleResult.data;
    const prevTags = watch('tags') || [];
    const newTags = [...prevTags, trimmed];

    const fullResult = fullTagsSchema.safeParse(newTags);
    if (!fullResult.success) {
      setTagError(fullResult.error.errors[0].message);
      return;
    }

    setValue('tags', newTags);
    setTagInput('');
    setTagError(null);
  };

  const handleTagRemove = (tagToRemove: string) => {
    const currentTags = watch('tags') || [];
    const nextTags = currentTags.filter((tag) => tag !== tagToRemove);
    setValue('tags', nextTags);
  };

  const LabelClass =
    'block text-black-600 mb-[9px] text-lg font-semibold md:mb-2.5 md:text-lg lg:mb-[27px] lg:text-xl';
  const LabelRequiredClass = 'text-red ml-1 text-lg md:text-lg lg:ml-1.5 lg:text-xl';

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <ul className='flex flex-col gap-y-10'>
        <li>
          <label className={cn(LabelClass)}>
            내용
            <span className={cn(LabelRequiredClass)}>*</span>
          </label>
          <TextArea
            placeholder='500자 이내로 입력해주세요.'
            error={errors.content?.message}
            {...register('content')}
          />
        </li>
        <li>
          <label className={cn(LabelClass)}>
            저자
            <span className={cn(LabelRequiredClass)}>*</span>
          </label>
          <ul className='flex flex-wrap gap-4'>
            {AUTHOR_RADIO.map((option) => (
              <li key={option}>
                <Radio
                  name='selectedAuthor'
                  label={option}
                  value={option}
                  checked={watch('selectedAuthor') === option}
                  onChange={(val) =>
                    setValue('selectedAuthor', val as (typeof AUTHOR_RADIO)[number], {
                      shouldValidate: true,
                    })
                  }
                />
              </li>
            ))}
          </ul>
          {watch('selectedAuthor') === '직접 입력' && (
            <Input
              type='text'
              placeholder='저자 이름 입력'
              {...register('author')}
              error={errors.author?.message}
              className='mt-3'
            />
          )}
        </li>
        <li>
          <label className={cn(LabelClass)}>출처</label>
          <Input
            type='text'
            placeholder='출처 제목 입력'
            {...register('referenceTitle')}
            error={errors.referenceTitle?.message}
          />
          <Input
            type='text'
            placeholder='URL (ex. https://example.com)'
            {...register('referenceUrl')}
            error={errors.referenceUrl?.message}
            className='mt-2 lg:mt-4'
          />
        </li>
        <li>
          <label className={cn(LabelClass)}>태그</label>
          <Input
            placeholder='입력하여 태그 작성 (최대 10자)'
            type='text'
            value={tagInput}
            onChange={(e) => {
              setTagInput(e.target.value);
              if (tagError) setTagError(null);
            }}
            onKeyDown={handleTagKeyDown}
            error={tagError || undefined}
          />

          {(watch('tags') || []).length > 0 && (
            <ul className='mt-4 flex flex-wrap gap-2'>
              {watch('tags')!.map((tag) => (
                <li key={tag}>
                  <Chip label={tag} onRemove={() => handleTagRemove(tag)} />
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
      <Button className='mt-6 lg:mt-10' disabled={!isValid || isSubmitting} type='submit'>
        {isSubmitting ? (
          <Spinner className='fill-black text-gray-100' />
        ) : mode === 'create' ? (
          '작성 완료'
        ) : (
          '수정 완료'
        )}
      </Button>
    </form>
  );
}
