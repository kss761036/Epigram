import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChartLegend from './Chart.legend';

describe('ChartLegend', () => {
  const mockOnClick = jest.fn();
  const testData = [
    {
      id: '0',
      index: 0,
      label: 'MOVED',
      color: '#48BB98',
      value: 10,
      selected: true,
    },
    {
      id: '1',
      index: 1,
      label: 'HAPPY',
      color: '#FBC85B',
      value: 8,
      selected: false,
    },
  ];

  const testCustomLabelData = [
    {
      id: '0',
      index: 0,
      label: 'MOVED',
      customLabel: 'custom-MOVED',
      color: '#48BB98',
      value: 10,
      selected: true,
    },
    {
      id: '1',
      index: 1,
      label: 'HAPPY',
      customLabel: 'custom-HAPPY',
      color: '#FBC85B',
      value: 8,
      selected: false,
    },
  ];

  it('전달된 데이터가 올바르게 렌더링되는지 확인', () => {
    render(<ChartLegend data={testData} onLegendClick={mockOnClick} />);

    testData.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('custom label이 있을경우 custom label을 통해서 제작된 label이 렌더링되는지 확인', () => {
    render(<ChartLegend data={testCustomLabelData} onLegendClick={mockOnClick} />);

    testCustomLabelData.forEach(({ customLabel }) => {
      expect(screen.getByText(customLabel)).toBeInTheDocument();
    });
  });

  it('클릭 시 onClick 핸들러가 올바르게 호출되는지 확인', () => {
    render(<ChartLegend data={testData} onLegendClick={mockOnClick} />);

    const firstItem = screen.getByText('HAPPY').closest('li');
    expect(firstItem).toBeInTheDocument();

    fireEvent.click(firstItem!);

    expect(mockOnClick).toHaveBeenCalledWith('1');
  });

  it('선택된 항목만 opacity 100을 가지는지 확인', () => {
    render(<ChartLegend data={testData} onLegendClick={mockOnClick} />);

    const firstItem = screen.getByText('MOVED');
    const secondItem = screen.getByText('HAPPY');

    expect(firstItem).toHaveClass('opacity-100');
    expect(secondItem).toHaveClass('opacity-40');
  });
});
