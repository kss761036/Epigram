import React from 'react';
import { render, screen } from '@testing-library/react';
import Calendar from './Calendar';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Emotion } from '@/types/common';

const sampleMoodData: { [dateString: string]: Emotion } = {
  '2025-03-13': 'ANGRY',
  '2025-03-15': 'SAD',
  '2025-03-21': 'ANGRY',
};

describe('Calendar Component', () => {
  it('헤더에 현재 월을 표시한다', () => {
    render(<Calendar moodData={{}} />);
    const monthText = format(new Date(), 'yyyy년 MMMM', { locale: ko });
    expect(screen.getByText(monthText)).toBeInTheDocument();
  });

  it('요일이 제대로 렌더링된다', () => {
    render(<Calendar moodData={{}} />);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    days.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it('캘린더 셀(날짜)이 렌더링된다', () => {
    render(<Calendar moodData={{}} />);
    const cells = screen.getAllByText(/\d+/);
    expect(cells.length).toBeGreaterThan(0);
  });

  it('moodData가 있을 경우 Emoji가 렌더링된다', () => {
    const { container } = render(<Calendar moodData={sampleMoodData} />);
    const emojiElements = container.querySelectorAll('svg[viewBox="0 0 32 32"]');
    expect(emojiElements.length).toBeGreaterThan(0);
  });
});
