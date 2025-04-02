import { describe, expect } from '@jest/globals';
import { truncateText } from './truncateText';

describe('getPercentage 함수 테스트', () => {
  it('지정된 숫자 이상 문자가 있을경우 ...을 붙인 문자열을 반환한다.', () => {
    const testLength = 4;
    const testText = 'abcdefghijklmnopqrstuvwxyz';

    expect(truncateText(testText, testLength)).toBe('abcd...');
  });

  it('자르고싶은 길이를 넣지 않으면 기본값인 10글자로 잘라서 반환한다.', () => {
    const testText = 'abcdefghijklmnopqrstuvwxyz';

    expect(truncateText(testText)).toBe('abcdefghij...');
  });

  it('자르고싶은 길이를 보다 작으면 그대로 반환한다.', () => {
    const testText = 'abcd';

    expect(truncateText(testText)).toBe('abcd');
  });
});
