'use client';

import { useMutation } from '@tanstack/react-query';
import Button from '@/components/Button';
import Chip from '@/components/Chip';
import Input from '@/components/Input';
import Radio from '@/components/Radio';
import { Section } from '@/components/Section';
import TextArea from '@/components/TextArea';
import { cn } from '@/utils/helper';
import { createEpigram } from '@/apis/epigram/epigram.service';
import { useState } from 'react';

export default function Page() {
  const LabelClass =
    'block text-black-600 mb-[9px] text-lg font-semibold md:mb-2.5 md:text-lg lg:mb-[27px] lg:text-xl';
  const LabelRequiredClass = 'text-red ml-1 text-lg md:text-lg lg:ml-1.5 lg:text-xl';

  // 입력 데이터 상태
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [referenceTitle, setReferenceTitle] = useState('');
  const [referenceUrl, setReferenceUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');

  const [tagInput, setTagInput] = useState('');

  const [contentError, setContentError] = useState<string | null>(null);
  const [authorError, setAuthorError] = useState<string | null>(null);

  // 리액트 쿼리의 useMutation 사용 (에피그램 작성 API 호출)
  const { mutate, isPending } = useMutation({
    mutationFn: createEpigram,
    onSuccess: () => {
      alert('에피그램이 성공적으로 작성되었습니다.');
    },
    onError: (error) => {
      console.error('에피그램 작성 실패:', error);
      alert('에피그램 작성에 실패했습니다.');
    },
  });

  // 폼 제출 핸들러
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

    mutate({
      content,
      author: selectedAuthor === '직접 입력' ? author : selectedAuthor,
      tags,
      referenceTitle: referenceTitle || null,
      referenceUrl: referenceUrl || null,
    });
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

  // 태그 입력 핸들러
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  // Enter 키 입력 시 태그 추가
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (tags.length < 10 && !tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };

  // 태그 삭제 핸들러
  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className='mx-auto mt-[56px] w-full max-w-[408px] p-6 lg:max-w-[664px]'>
      <Section>에피그램 만들기</Section>
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
                  id='author-1'
                  name='author'
                  label='직접 입력'
                  onChange={() => setSelectedAuthor('직접 입력')}
                />
              </li>
              <li>
                <Radio
                  id='author-2'
                  name='author'
                  label='알 수 없음'
                  onChange={() => setSelectedAuthor('알 수 없음')}
                />
              </li>
              <li>
                <Radio
                  id='author-3'
                  name='author'
                  label='본인'
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

        <Button className='mt-6 lg:mt-10' disabled={true} type='submit'>
          작성 완료
        </Button>
      </form>
    </div>
  );
}
