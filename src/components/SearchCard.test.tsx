import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchCard from './SearchCard';

describe('SearchCard Component', () => {
  const mockProps = {
    keyword: '우울',
    content: '우울증이란 우리를 내적인 나락으로 이끄는 유혹의 손길이다.',
    author: '클라우스 랑에',
    tags: [
      { id: 1, name: '짧은명언' },
      { id: 2, name: '우울증' },
    ],
    referenceUrl: '/',
    className: undefined,
    contentClassName: undefined,
  };

  test('검색 키워드가 올바르게 표시되는지 확인', () => {
    render(<SearchCard {...mockProps} />);
    expect(screen.getAllByText(mockProps.keyword).length).toBeGreaterThan(0);
  });

  test('띄어쓰기가 있는 검색 키워드도 정규표현식으로 정상적으로 찾을 수 있는지 확인', () => {
    const spacedProps = { ...mockProps, keyword: '우 울' };
    render(<SearchCard {...spacedProps} />);
    const regex = new RegExp(spacedProps.keyword.replace(/\s/g, ''), 'g');
    expect(screen.getByRole('link').textContent?.replace(/\s+/g, '')).toMatch(regex);
  });

  test('문구 중 띄어쓰기가 포함된 검색어도 정규표현식으로 정상적으로 찾을 수 있는지 확인', () => {
    const spacedContentProps = {
      ...mockProps,
      content: '우 울증이란 우리를 내적인 나락으로 이끄는 유혹의 손길이다.',
    };
    render(<SearchCard {...spacedContentProps} />);
    const regex = new RegExp(spacedContentProps.content.replace(/\s/g, ''), 'g');
    expect(screen.getByRole('link').textContent?.replace(/\s/g, '')).toMatch(regex);
  });
});
