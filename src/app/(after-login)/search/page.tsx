'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useRecentSearchStore } from '@/store/recentSearchStore';
import SearchHeader from './_components/SearchHeader';
import SearchRecent from './_components/SearchRecent';
import SearchResult from './_components/SearchResult';
import SearchWrapper from './_components/SearchWrapper';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const keyword = searchParams.get('keyword') || undefined;
  const {
    keywords: recentKeywords,
    add: saveRecentKeyword,
    clear: clearRecentKeywords,
  } = useRecentSearchStore();

  const handleSubmit = (keyword: string | undefined) => {
    const searchParams = new URLSearchParams();

    if (keyword) {
      saveRecentKeyword(keyword);
      searchParams.append('keyword', keyword);
    }

    router.replace(`/search?${searchParams.toString()}`);
  };

  return (
    <SearchWrapper>
      <SearchHeader key={keyword} keyword={keyword} onSubmit={handleSubmit} />
      <SearchRecent recentKeywords={recentKeywords} onClearRecentKeywords={clearRecentKeywords} />
      <SearchResult keyword={keyword} />
    </SearchWrapper>
  );
}
