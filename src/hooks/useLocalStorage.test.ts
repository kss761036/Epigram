import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  const key = 'test-key';

  beforeEach(() => {
    localStorage.clear();
  });

  it('초기 상태에서 localStorage에 저장된 값을 불러오는지 확인', () => {
    localStorage.setItem(key, JSON.stringify([1, 2, 3]));

    const { result } = renderHook(() => useLocalStorage<number[]>(key, []));

    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it('상태 업데이트시 localStorage 값도 동기화 되는지 확인', () => {
    const { result } = renderHook(() => useLocalStorage<number[]>(key, []));

    act(() => {
      result.current[1]([4, 5, 6]);
    });

    expect(result.current[0]).toEqual([4, 5, 6]);
    expect(JSON.parse(localStorage.getItem(key) || '')).toEqual([4, 5, 6]);
  });

  it('상태 업데이트를 함수로 처리할 때 동작이 정상적인지 확인', () => {
    localStorage.setItem(key, JSON.stringify([1, 2, 3]));

    const { result } = renderHook(() => useLocalStorage<number[]>(key, []));

    act(() => {
      result.current[1]((prev) => [...prev, 4]);
    });

    expect(result.current[0]).toEqual([1, 2, 3, 4]);
    expect(JSON.parse(localStorage.getItem(key) || '')).toEqual([1, 2, 3, 4]);
  });

  it('잘못된 JSON 값이 localStorage에 있을 때 에러 핸들링이 정상적으로 동작하는지 확인', () => {
    localStorage.setItem(key, '{invalidJson');

    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage<number[]>(key, []));

    expect(result.current[0]).toEqual([]);
    expect(consoleErrorMock).toHaveBeenCalled();
  });
});
