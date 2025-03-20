'use client';

import { useSearchParams } from 'next/navigation';
import SearchWrapper from './_components/SearchWrapper';
import SearchHeader from './_components/SearchHeader';
import SearchRecent from './_components/SearchRecent';
import SearchResult from './_components/SearchResult';
import useRecent from './_components/useRecent';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || undefined;
  const {
    keywords: recentKeywords,
    save: saveRecentKeyword,
    clear: clearRecentKeywords,
  } = useRecent();

  return (
    <SearchWrapper>
      <SearchHeader key={keyword} keyword={keyword} onSaveRecentKeyword={saveRecentKeyword} />
      <SearchRecent recentKeywords={recentKeywords} onClearRecentKeywords={clearRecentKeywords} />
      <SearchResult keyword={keyword} />
    </SearchWrapper>
  );
}
