import { render, screen, fireEvent } from '@testing-library/react';
import Chart from './Chart';

jest.mock('react-chartjs-2', () => ({
  __esModule: true,
  Doughnut: jest.fn(() => <canvas data-testid='chart-canvas' />),
}));

jest.mock('@/utils/getPercentage', () => ({
  getPercentage: jest.fn(() => '10%'),
}));

jest.mock('./Chart.legend', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid='chart-legend' />),
}));

describe('차트 컴포넌트', () => {
  const mockData = [10, 20, 30];
  const mockColors = ['red', 'blue', 'green'];
  const mockLabels = ['A', 'B', 'C'];

  it('차트 컴포넌트 랜더링 테스트', () => {
    render(<Chart data={mockData} colors={mockColors} labels={mockLabels} />);
    expect(screen.getByTestId('chart-canvas')).toBeInTheDocument();
  });

  it('labels를 넣지 않으면, 차트만 랜더링 되는지 테스트', () => {
    render(<Chart data={mockData} colors={mockColors} />);

    expect(screen.queryByTestId('chart-legend')).toBeNull();
  });

  it('custom center 를 넣으면 생성이 되는지 테스트', () => {
    render(
      <Chart
        data={mockData}
        colors={mockColors}
        customCenter={(currentIndex) => <div data-testid='custom-center'>{currentIndex}</div>}
      />,
    );

    expect(screen.getByTestId('custom-center')).toBeInTheDocument();
  });
});
