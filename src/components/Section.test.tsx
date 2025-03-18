import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Section, SectionTitle, SectionUtil } from './Section';

describe('Section', () => {
  test('텍스트를 전달하면 SectionTitle로 감싸서 렌더링한다.', () => {
    render(<Section>테스트 제목</Section>);
    const titleElement = screen.getByText('테스트 제목');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H2');
  });

  test('컴포넌트를 children으로 전달하면 그대로 렌더링한다.', () => {
    render(
      <Section>
        <SectionTitle>제목 컴포넌트</SectionTitle>
      </Section>,
    );
    const titleElement = screen.getByText('제목 컴포넌트');
    expect(titleElement).toBeInTheDocument();
  });

  test('className이 정상적으로 적용된다.', () => {
    render(<Section className='custom-class'>내용</Section>);
    const sectionElement = screen.getByText('내용').parentElement;
    expect(sectionElement).toHaveClass('custom-class');
  });
});

describe('SectionTitle', () => {
  test('텍스트가 올바르게 렌더링된다.', () => {
    render(<SectionTitle>타이틀</SectionTitle>);
    const titleElement = screen.getByText('타이틀');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H2');
  });

  test('className이 정상적으로 적용된다.', () => {
    render(<SectionTitle className='title-class'>타이틀</SectionTitle>);
    const titleElement = screen.getByText('타이틀');
    expect(titleElement).toHaveClass('title-class');
  });
});

describe('SectionUtil', () => {
  test('children이 정상적으로 렌더링된다.', () => {
    render(<SectionUtil>유틸 내용</SectionUtil>);
    const utilElement = screen.getByText('유틸 내용');
    expect(utilElement).toBeInTheDocument();
  });

  test('className이 정상적으로 적용된다.', () => {
    render(<SectionUtil className='util-class'>유틸</SectionUtil>);
    const utilElement = screen.getByText('유틸');
    expect(utilElement).toHaveClass('util-class');
  });
});
