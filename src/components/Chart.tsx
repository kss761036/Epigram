'use client';

import { PropsWithChildren, ReactNode, useState } from 'react';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { v4 as uuid } from 'uuid';
import ChartLegend from './Chart.legend';

ChartJS.register(ArcElement);

const DEFAULT_CHART_COLOR = '#EEEEEE';
const DEFAULT_LABEL_TEMPLATE = 'label-';

export type Label = string;

export type ChartData = {
  id: string;
  index: number;
  label: Label;
  color: string;
  value: number;
  selected: boolean;
  customLabel?: ReactNode;
};
interface ChartProps {
  values: number[];
  colors?: string[];
  labels?: Label[];
  showLegend?: boolean;
  customLabel?: (data: ChartData) => ReactNode;
  customCenter?: (activeData: ChartData) => ReactNode;
}

export default function Chart({
  values,
  colors,
  labels,
  showLegend = true,
  customLabel,
  customCenter,
}: ChartProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const initialData = values.map((value, index) => ({
    id: uuid(),
    index,
    label: labels?.[index] || `${DEFAULT_LABEL_TEMPLATE}${index + 1}`,
    color: colors?.[index] || DEFAULT_CHART_COLOR,
    value,
    selected: index === currentIndex,
  }));

  const chartData = customLabel
    ? initialData.map((item) => ({ ...item, customLabel: customLabel(item) }))
    : initialData;

  const handleLegendClick = (id: string) => {
    const targetIndex = chartData.find((item) => item.id === id)?.index || 0;
    setCurrentIndex(targetIndex);
  };

  const handleChartClick = (index: number) => {
    setCurrentIndex(index);
  };

  const selectedData = chartData.find((item) => item.selected === true) || chartData[0];

  return (
    <ChartContainer>
      <ChartCavnas>
        <Doughnut
          data={{
            datasets: [
              {
                data: chartData.map((item) => item.value),
                backgroundColor: chartData.map((item) => item.color),
                hoverOffset: 4,
                borderRadius: 3.5,
              },
            ],
          }}
          options={{
            cutout: '90%',
            responsive: true,
            onHover: (event, chartElement) => {
              if (event && event.native?.target) {
                (event.native.target as HTMLElement).style.cursor = chartElement[0]
                  ? 'pointer'
                  : 'default';
              }
            },
            onClick: (_, active) => {
              if (!active.length || !active[0]) return;
              handleChartClick(active[0].index);
            },
            plugins: { legend: { display: false } },
          }}
        />
        <ChartCenter>{customCenter?.(selectedData)}</ChartCenter>
      </ChartCavnas>
      {showLegend && <ChartLegend data={chartData} onLegendClick={handleLegendClick} />}
    </ChartContainer>
  );
}

function ChartContainer({ children }: PropsWithChildren) {
  return (
    <div className='flex items-center justify-evenly gap-6 rounded-lg border border-blue-200 p-6'>
      {children}
    </div>
  );
}

function ChartCavnas({ children }: PropsWithChildren) {
  return <div className='relative aspect-square w-[120px] lg:w-[180px]'>{children}</div>;
}

function ChartCenter({ children }: PropsWithChildren) {
  return (
    <div className='pointer-events-none absolute top-1/2 left-1/2 z-10 flex aspect-square w-[80%] border-spacing-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full select-none'>
      {children}
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 100 100'
        className='absolute h-full w-full opacity-10'
      >
        <circle
          cx='50'
          cy='50'
          r='48'
          fill='none'
          stroke='#000'
          strokeWidth='1'
          strokeDasharray='1 4'
        />
      </svg>
    </div>
  );
}
