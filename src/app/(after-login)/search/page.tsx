'use client';

import { useSearchParams } from 'next/navigation';
import { useRecentSearchStore } from '@/store/recentSearchStore';
import SearchHeader from './_components/SearchHeader';
import SearchRecent from './_components/SearchRecent';
import SearchResult from './_components/SearchResult';
import SearchWrapper from './_components/SearchWrapper';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || undefined;
  const {
    keywords: recentKeywords,
    add: saveRecentKeyword,
    clear: clearRecentKeywords,
  } = useRecentSearchStore();

  return (
    <SearchWrapper>
      <SearchHeader key={keyword} keyword={keyword} onSaveRecentKeyword={saveRecentKeyword} />
      <SearchRecent recentKeywords={recentKeywords} onClearRecentKeywords={clearRecentKeywords} />
      <SearchResult keyword={keyword} />
    </SearchWrapper>
  );
}
