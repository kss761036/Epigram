import { render, screen } from '@testing-library/react';
import Sample from './Sample';

describe('Sample 컴포넌트', () => {
  it('기본 primary 색상으로 렌더링된다', () => {
    render(<Sample>Sample</Sample>);

    const sampleElement = screen.getByText('Sample');

    expect(sampleElement).toHaveClass('bg-blue-900', 'text-white');
  });

  it('secondary 색상으로 렌더링된다', () => {
    render(<Sample color='secondary'>Sample</Sample>);

    const sampleElement = screen.getByText('Sample');

    expect(sampleElement).toHaveClass('bg-blue-200');
  });

  it('className prop으로 전달된 클래스가 적용된다', () => {
    render(
      <Sample color='primary' className='custom-class'>
        Sample
      </Sample>,
    );

    const sampleElement = screen.getByText('Sample');

    expect(sampleElement).toHaveClass('custom-class');
  });

  it('기타 props가 올바르게 전달된다', () => {
    render(
      <Sample color='primary' data-testid='custom-element'>
        Sample
      </Sample>,
    );

    const sampleElement = screen.getByTestId('custom-element');

    expect(sampleElement).toBeInTheDocument();
  });
});
