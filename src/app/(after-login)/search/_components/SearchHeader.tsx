'use client';

import { FormEvent, useEffect, useRef } from 'react';
import Input from '@/components/Input';

interface SearchHeaderProps {
  keyword?: string;
  onSubmit: (keyword: string | undefined) => void;
}

export default function SearchHeader({ keyword, onSubmit }: SearchHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const keyword = inputRef.current?.value.trim();
    onSubmit(keyword);
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
