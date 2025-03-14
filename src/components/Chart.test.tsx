import { render, screen, fireEvent } from '@testing-library/react';
import Chart from './Chart';

jest.mock('react-chartjs-2', () => ({
  __esModule: true,
  Doughnut: jest.fn(() => <canvas data-testid='chart-canvas' />),
}));

jest.mock('@/utils/getPercentage', () => ({
  getPercentage: jest.fn(() => '10%'),
}));

describe('차트 컴포넌트', () => {
  const mockValues = [10, 20, 30];
  const mockColors = ['red', 'blue', 'green'];
  const mockLabels = ['A', 'B', 'C'];

  it('차트 컴포넌트 랜더링 테스트', () => {
    render(<Chart values={mockValues} colors={mockColors} labels={mockLabels} />);
    expect(screen.getByTestId('chart-canvas')).toBeInTheDocument();
  });

  it('showLegend 옵션을 false로 넣으면, 차트만 랜더링 되는지 테스트', () => {
    render(<Chart values={mockValues} colors={mockColors} showLegend={false} />);

    expect(screen.queryByTestId('chart-legend')).toBeNull();
  });

  it('custom center 를 넣으면 생성이 되는지 테스트', () => {
    render(
      <Chart
        values={mockValues}
        colors={mockColors}
        customCenter={() => <div data-testid='custom-center'>customCenter</div>}
      />,
    );

    expect(screen.getByTestId('custom-center')).toBeInTheDocument();
  });

  it('custom label 을 넣으면 생성이 되는지 테스트', () => {
    render(
      <Chart
        values={mockValues}
        colors={mockColors}
        labels={mockLabels}
        customLabel={(data) => <div data-testid={`custom-label-${data.label}`}>customLabel</div>}
      />,
    );

    expect(screen.getByTestId('custom-label-A')).toBeInTheDocument();
  });
});
