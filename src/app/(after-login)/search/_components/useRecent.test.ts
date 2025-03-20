import { act, renderHook } from '@testing-library/react';
import useRecent from './useRecent';

describe('useRecent', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('새로운 키워드를 추가하고 최신순으로 저장되는지 확인', () => {
    const { result } = renderHook(() => useRecent());

    act(() => {
      result.current.save('React');
      result.current.save('Next.js');
      result.current.save('TypeScript');
    });

    expect(result.current.keywords).toEqual(['TypeScript', 'Next.js', 'React']);
    expect(JSON.parse(localStorage.getItem('recentKeywords') || '')).toEqual([
      'TypeScript',
      'Next.js',
      'React',
    ]);
  });

  it('중복된 키워드는 제거되고 최신 값이 맨 앞으로 이동하는지 확인', () => {
    const { result } = renderHook(() => useRecent());

    act(() => {
      result.current.save('React');
      result.current.save('Next.js');
      result.current.save('React');
    });

    expect(result.current.keywords).toEqual(['React', 'Next.js']);
    expect(JSON.parse(localStorage.getItem('recentKeywords') || '')).toEqual(['React', 'Next.js']);
  });

  it(`키워드 개수가 10개를 초과하면 가장 오래된 키워드가 삭제되는지 확인`, () => {
    const { result } = renderHook(() => useRecent());

    act(() => {
      for (let i = 0; i < 12; i++) {
        result.current.save(`keyword${i}`);
      }
    });

    expect(result.current.keywords.length).toBe(10);
  });

  it('빈 키워드는 추가되지 않아야 함', () => {
    const { result } = renderHook(() => useRecent());

    act(() => {
      result.current.save('React');
      result.current.save('');
      result.current.save('  ');
    });

    expect(result.current.keywords).toEqual(['React']);
  });

  it('clear()가 호출되면 저장된 키워드가 모두 삭제되는지 확인', () => {
    const { result } = renderHook(() => useRecent());

    act(() => {
      result.current.save('React');
      result.current.save('Next.js');
      result.current.clear();
    });

    expect(result.current.keywords).toEqual([]);
    expect(localStorage.getItem('recentKeywords')).toEqual('[]');
  });
});
