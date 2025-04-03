import formatTime from './formatTime';

jest.useFakeTimers().setSystemTime(new Date('2024-04-03T12:00:00Z'));

describe('formatTime', () => {
  it('29초 전이면 "1분 미만 전"이어야 함', () => {
    const date = new Date(Date.now() - 29 * 1000).toISOString();
    const result = formatTime(date);
    expect(result).toBe('1분 미만 전');
  });

  it('59초 전이면 "1분 전"이어야 함', () => {
    const date = new Date(Date.now() - 59 * 1000).toISOString();
    const result = formatTime(date);
    expect(result).toBe('1분 전');
  });

  it('1분 전이면 "1분 전"을 반환해야 함', () => {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();
    const result = formatTime(oneMinuteAgo);
    expect(result).toBe('1분 전');
  });

  it('59분 전이면 "약 1시간 전"이어야 함', () => {
    const date = new Date(Date.now() - 59 * 60 * 1000).toISOString();
    expect(formatTime(date)).toBe('약 1시간 전');
  });

  it('19시간 30분 전이면 "약 20시간 전"을 반환해야 함', () => {
    const fiveHoursAgo = new Date(Date.now() - 19.5 * 60 * 60 * 1000).toISOString();
    const result = formatTime(fiveHoursAgo);
    expect(result).toBe('약 20시간 전');
  });

  it('1일 전이면 "1일 전"을 반환해야 함', () => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const result = formatTime(oneDayAgo);
    expect(result).toBe('1일 전');
  });

  it('유효하지 않은 날짜가 들어오면 에러를 던져야 함', () => {
    expect(() => formatTime('2024/11/32')).toThrow(
      'formatTime: 유효하지 않은 날짜 형식입니다. 입력값: 2024/11/32',
    );
  });
});
