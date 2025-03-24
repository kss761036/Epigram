import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const RECENT_SEARCH_SIZE = 10;

export type RecentSearchProps = {
  keywords: string[];
  add: (keyword: string) => void;
  clear: () => void;
};

export const useRecentSearchStore = create(
  persist<RecentSearchProps>(
    (set) => ({
      keywords: [],
      add: (keyword: string) => {
        set((state) => {
          const keywords = state.keywords;
          const newKeywords = keywords
            ? [keyword, ...keywords.filter((item) => item !== keyword)].slice(0, RECENT_SEARCH_SIZE)
            : [keyword];
          return { ...state, keywords: newKeywords };
        });
      },
      clear: () => set({ keywords: [] }),
    }),
    { name: 'recent-keywords' },
  ),
);
