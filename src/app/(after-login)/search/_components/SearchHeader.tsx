'use client';

import { FormEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';

interface SearchHeaderProps {
  keyword?: string;
  onSaveRecentKeyword: (keyword: string) => void;
}

export default function SearchHeader({ keyword, onSaveRecentKeyword }: SearchHeaderProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const keyword = inputRef.current?.value.trim();
    const searchParams = new URLSearchParams();

    if (keyword) {
      onSaveRecentKeyword(keyword);
      searchParams.append('keyword', keyword);
    }

    router.replace(`/search?${searchParams.toString()}`);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        type='search'
        className='border-b-4'
        placeholder='검색어를 입력해주세요'
        defaultValue={keyword}
      />
    </form>
  );
}
