import { renderHook, act } from '@testing-library/react';
import { useFeedsListTypeStore } from './feedsListTypeStore';

describe('useFeedsListTypeStore', () => {
  it('처음에는 type은 list이다.', () => {
    const { result } = renderHook(() => useFeedsListTypeStore());

    expect(result.current.listType).toEqual('list');
  });

  it('토글을 하면 grid로 바뀐다.', () => {
    const { result } = renderHook(() => useFeedsListTypeStore());

    act(() => {
      result.current.toggle();
    });

    expect(result.current.listType).toEqual('grid');
  });

  it('한번더 토글을 하면 list로 바뀐다.', () => {
    const { result } = renderHook(() => useFeedsListTypeStore());

    act(() => {
      result.current.toggle();
    });

    expect(result.current.listType).toEqual('list');
  });
});
