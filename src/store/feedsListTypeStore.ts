import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FeedsListTypeProps = {
  listType: 'list' | 'grid';
  toggle: () => void;
};

export const useFeedsListTypeStore = create(
  persist<FeedsListTypeProps>(
    (set) => ({
      listType: 'list',
      toggle: () => {
        set((state) => {
          const type = state.listType;
          return { ...state, listType: type === 'list' ? 'grid' : 'list' };
        });
      },
    }),
    { name: 'feedslistType' },
  ),
);
