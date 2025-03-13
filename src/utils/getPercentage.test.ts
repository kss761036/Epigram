import { describe, test, expect } from '@jest/globals';
import { getPercentage } from './getPercentage';

describe('getPercentage 함수 테스트', () => {
  it('정상적인 값 입력 시 올바른 퍼센트를 반환합니다..', () => {
    expect(getPercentage(25, [25, 25, 50])).toBe('25%');
  });

  it('전체 합이 0인 경우 0%를 반환해야 합니다.', () => {
    expect(getPercentage(0, [0, 0, 0])).toBe('0%');
  });

  it('value가 전체 합보다 큰 경우에도 정상 동작해야 합니다.', () => {
    expect(getPercentage(200, [100, 100])).toBe('100%');
  });

  it('소수점이 있는 경우 버림 처리해야 합니다.', () => {
    expect(getPercentage(10, [30, 30, 30])).toBe('11%');
  });
});
