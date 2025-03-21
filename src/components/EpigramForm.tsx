'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import TextArea from '@/components/TextArea';
import Input from '@/components/Input';
import Radio from '@/components/Radio';
import Chip from '@/components/Chip';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { cn } from '@/utils/helper';
import { CreateEpigramFormType } from '@/apis/epigram/epigram.type';

interface EpigramFormProps {
  mode: 'create' | 'edit';
  defaultValues?: Partial<CreateEpigramFormType>;
  onSubmit: (data: CreateEpigramFormType) => void;
  isSubmitting?: boolean;
}

export default function EpigramForm({
  mode,
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: EpigramFormProps) {
  const [content, setContent] = useState(defaultValues?.content || '');
  const [author, setAuthor] = useState(
    defaultValues?.author && !['알 수 없음', '본인'].includes(defaultValues.author)
      ? defaultValues.author
      : '',
  );
  const [referenceTitle, setReferenceTitle] = useState(defaultValues?.referenceTitle || '');
  const [referenceUrl, setReferenceUrl] = useState(defaultValues?.referenceUrl || '');
  const [tags, setTags] = useState<string[]>(defaultValues?.tags || []);
  const [selectedAuthor, setSelectedAuthor] = useState(
    defaultValues?.author
      ? ['알 수 없음', '본인'].includes(defaultValues.author)
        ? defaultValues.author
        : '직접 입력'
      : '',
  );

  const [tagInput, setTagInput] = useState('');

  const [contentError, setContentError] = useState<string | null>(null);
  const [authorError, setAuthorError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (content.length > 500) {
      setContentError('500자 이내로 입력해주세요.');
      return;
    }

    if (selectedAuthor === '직접 입력') {
      if (!author.trim()) {
        setAuthorError('저자를 입력해주세요.');
        return;
      } else {
        setAuthorError(null);
      }
    }

    setContentError(null);

    const payload: Partial<CreateEpigramFormType> = {
      content,
      author: selectedAuthor === '직접 입력' ? author : selectedAuthor,
      tags,
    };

    if (referenceTitle) payload.referenceTitle = referenceTitle;
    if (referenceUrl) payload.referenceUrl = referenceUrl;

    onSubmit(payload as CreateEpigramFormType);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);

    if (value.length > 500) {
      setContentError('500자 이내로 입력해주세요.');
    } else {
      setContentError(null);
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmed = tagInput.trim();

    if (e.key === 'Enter' && !e.nativeEvent.isComposing && trimmed) {
      e.preventDefault();

      if (tags.length >= 3) {
        toast.error('태그는 최대 3개까지 가능합니다.');
        setTagInput('');
        return;
      }
      if (trimmed.length > 10) {
        toast.error('태그는 10자 이내로 입력해주세요.');
        return;
      }
      if (tags.includes(trimmed)) return;

      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const LabelClass =
    'block text-black-600 mb-[9px] text-lg font-semibold md:mb-2.5 md:text-lg lg:mb-[27px] lg:text-xl';
  const LabelRequiredClass = 'text-red ml-1 text-lg md:text-lg lg:ml-1.5 lg:text-xl';

  return (
    <form onSubmit={handleSubmit}>
      <ul className='flex flex-col gap-y-10'>
        <li>
          <label className={cn(LabelClass)}>
            내용
            <span className={cn(LabelRequiredClass)}>*</span>
          </label>
          <TextArea
            placeholder='500자 이내로 입력해주세요.'
            value={content}
            onChange={handleContentChange}
            error={contentError || undefined}
          />
        </li>
        <li>
          <label className={cn(LabelClass)}>
            저자
            <span className={cn(LabelRequiredClass)}>*</span>
          </label>
          <ul className='flex flex-wrap gap-4'>
            <li>
              <Radio
                name='author'
                label='직접 입력'
                checked={selectedAuthor === '직접 입력'}
                onChange={() => setSelectedAuthor('직접 입력')}
              />
            </li>
            <li>
              <Radio
                name='author'
                label='알 수 없음'
                checked={selectedAuthor === '알 수 없음'}
                onChange={() => setSelectedAuthor('알 수 없음')}
              />
            </li>
            <li>
              <Radio
                name='author'
                label='본인'
                checked={selectedAuthor === '본인'}
                onChange={() => setSelectedAuthor('본인')}
              />
            </li>
          </ul>
          {selectedAuthor === '직접 입력' && (
            <Input
              placeholder='저자 이름 입력'
              type='text'
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
                if (e.target.value.trim()) {
                  setAuthorError(null);
                }
              }}
              error={authorError || undefined}
              className='mt-3'
            />
          )}
        </li>
        <li>
          <label className={cn(LabelClass)}>출처</label>
          <Input
            placeholder='출처 제목 입력'
            type='text'
            value={referenceTitle}
            onChange={(e) => setReferenceTitle(e.target.value)}
          />
          <Input
            placeholder='URL (ex. https://www.website.com)'
            type='text'
            value={referenceUrl}
            onChange={(e) => setReferenceUrl(e.target.value)}
            className='mt-2 lg:mt-4'
          />
        </li>
        <li>
          <label className={cn(LabelClass)}>태그</label>
          <Input
            placeholder='입력하여 태그 작성 (최대 10자)'
            type='text'
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagKeyDown}
          />
          {tags.length > 0 && (
            <ul className='mt-4 flex flex-wrap gap-2'>
              {tags.map((tag) => (
                <li key={tag}>
                  <Chip label={tag} onRemove={() => handleTagRemove(tag)} />
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
      <Button
        className='mt-6 lg:mt-10'
        disabled={
          !content.trim() || !selectedAuthor || (selectedAuthor === '직접 입력' && !author.trim())
        }
        type='submit'
      >
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
