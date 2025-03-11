import { render, screen } from '@testing-library/react';
import TextArea from './TextArea';

describe('TextArea 컴포넌트', () => {
  it('placeholder가 올바르게 렌더링된다', () => {
    render(<TextArea placeholder='텍스트 입력' />);
    const textAreaElement = screen.getByPlaceholderText('텍스트 입력');
    expect(textAreaElement).toBeInTheDocument();
  });

  it('라벨이 제공되면 label 요소가 렌더링된다', () => {
    render(<TextArea label='설명' />);
    const labelElement = screen.getByText('설명');
    expect(labelElement).toBeInTheDocument();
  });

  it('에러 메시지가 전달되면 에러 메시지가 렌더링된다', () => {
    render(<TextArea error='오류 발생' />);
    const errorElement = screen.getByText('오류 발생');
    expect(errorElement).toBeInTheDocument();
  });

  it('className prop으로 전달된 클래스가 적용된다', () => {
    render(<TextArea className='custom-textarea' />);
    const textAreaElement = screen.getByRole('textbox');
    expect(textAreaElement).toHaveClass('custom-textarea');
  });

  it('기타 props가 올바르게 전달된다', () => {
    render(<TextArea data-testid='custom-element' />);
    const textAreaElement = screen.getByTestId('custom-element');
    expect(textAreaElement).toBeInTheDocument();
  });
});
