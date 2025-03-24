import { renderHook, act } from '@testing-library/react';
import { useRecentSearchStore } from './recentSearchStore';

describe('useRecentSearchStore', () => {
  beforeEach(() => {
    act(() => {
      useRecentSearchStore.getState().clear();
    });
  });

  it('처음에는 빈배열이여야 한다.', () => {
    const { result } = renderHook(() => useRecentSearchStore());
    expect(result.current.keywords).toEqual([]);
  });

  it('키워드 add 테스트', () => {
    const testKeyword = 'test';
    const { result } = renderHook(() => useRecentSearchStore());

    act(() => {
      result.current.add(testKeyword);
    });

    expect(result.current.keywords).toEqual([testKeyword]);
  });

  it('존재하는 키워드일경우 제일 앞으로 가져온다.', () => {
    const { result } = renderHook(() => useRecentSearchStore());

    act(() => {
      result.current.add('keyword1');
      result.current.add('keyword2');
      result.current.add('keyword1');
    });

    expect(result.current.keywords).toEqual(['keyword1', 'keyword2']);
  });

  it('최대 10개를 넘을수 없다.', () => {
    const { result } = renderHook(() => useRecentSearchStore());
    const RECENT_SEARCH_SIZE = 10;

    act(() => {
      for (let i = 0; i < RECENT_SEARCH_SIZE + 5; i++) {
        result.current.add(`keyword${i}`);
      }
    });

    expect(result.current.keywords.length).toBe(RECENT_SEARCH_SIZE);
  });

  it('키워드 clear 테스트', () => {
    const { result } = renderHook(() => useRecentSearchStore());

    act(() => {
      result.current.add('test keyword');
      result.current.clear();
    });

    expect(result.current.keywords).toEqual([]);
  });
});
