'use client';

import Link from 'next/link';
import Chip from '@/components/Chip';

interface SearchRecent {
  recentKeywords: string[];
  onClearRecentKeywords: () => void;
}

export default function SearchRecent({ recentKeywords, onClearRecentKeywords }: SearchRecent) {
  if (!recentKeywords.length) {
    return null;
  }

  return (
    <div className='flex flex-col gap-4 md:gap-6 lg:gap-10'>
      <header className='flex items-center justify-between'>
        <h3 className='text-black-700 text-lg font-medium md:text-xl lg:text-2xl'>최근 검색어</h3>
        <button
          className='text-red md:text-md cursor-pointer text-xs font-semibold lg:text-lg'
          onClick={onClearRecentKeywords}
        >
          모두지우기
        </button>
      </header>
      <ul className='flex flex-wrap gap-2 md:gap-4'>
        {recentKeywords.map((keyword) => (
          <li key={keyword}>
            <Link href={`/search?keyword=${keyword}`}>
              <Chip label={keyword} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
