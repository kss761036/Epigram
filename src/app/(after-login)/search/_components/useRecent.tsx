import useLocalStorage from '@/hooks/useLocalStorage';

const RECENT_SEARCH_SIZE = 10;

export default function useRecent() {
  const [keywords, setKeywords] = useLocalStorage<string[]>('recentKeywords', []);

  const save = (keyword: string) => {
    if (!keyword.trim()) return;

    setKeywords((prev) => {
      const newKeywords = prev
        ? [keyword, ...prev.filter((item) => item !== keyword)].slice(0, RECENT_SEARCH_SIZE)
        : [keyword];
      return newKeywords;
    });
  };

  const clear = () => {
    setKeywords([]);
  };

  return { keywords: keywords || [], save, clear };
}
