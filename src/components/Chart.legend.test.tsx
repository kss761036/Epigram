import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChartLegend from './Chart.legend';

describe('ChartLegend', () => {
  const mockOnClick = jest.fn();
  const testData = [
    { label: '감동', color: 'yellow', displayValue: '50%' },
    { label: '기쁨', color: 'blue', displayValue: '30%' },
    { label: '화남', color: 'red', displayValue: '20%' },
  ];

  it('전달된 데이터가 올바르게 렌더링되는지 확인', () => {
    render(<ChartLegend data={testData} currentIndex={0} onClick={mockOnClick} />);

    testData.forEach(({ label, displayValue }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getByText(displayValue)).toBeInTheDocument();
    });
  });

  it('클릭 시 onClick 핸들러가 올바르게 호출되는지 확인', () => {
    render(<ChartLegend data={testData} currentIndex={0} onClick={mockOnClick} />);

    const firstItem = screen.getByText('감동').closest('li');
    expect(firstItem).toBeInTheDocument();

    fireEvent.click(firstItem!);
    expect(mockOnClick).toHaveBeenCalledWith(0);
  });

  it('currentIndex가 적용된 항목만 opacity 100을 가지는지 확인', () => {
    const { rerender } = render(
      <ChartLegend data={testData} currentIndex={0} onClick={mockOnClick} />,
    );

    const firstDisplayValue = screen.getByText('50%');
    expect(firstDisplayValue).toHaveClass('opacity-100');

    const secondDisplayValue = screen.getByText('30%');
    expect(secondDisplayValue).toHaveClass('opacity-35');

    rerender(<ChartLegend data={testData} currentIndex={1} onClick={mockOnClick} />);
    expect(firstDisplayValue).toHaveClass('opacity-35');
    expect(secondDisplayValue).toHaveClass('opacity-100');
  });
});
