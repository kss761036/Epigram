'use client';

import { PropsWithChildren, ReactNode, useState } from 'react';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getPercentage } from '@/utils/getPercentage';
import ChartLegend from './Chart.legend';

ChartJS.register(ArcElement);

interface ChartProps {
  data: number[];
  colors: string[];
  labels?: (ReactNode | string)[];
  customCenter?: (activeIndex: number) => ReactNode;
}

export default function Chart({ data, colors, labels, customCenter }: ChartProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const legendData =
    labels &&
    data.map((item, index) => ({
      label: labels[index],
      color: colors[index],
      displayValue: getPercentage(item, data),
    }));

  return (
    <ChartContainer>
      <ChartCavnas>
        <Doughnut
          data={{
            datasets: [
              {
                data,
                backgroundColor: colors,
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
              setCurrentIndex(active[0].index);
            },
            plugins: { legend: { display: false } },
          }}
        />
        <ChartCenter>{customCenter?.(currentIndex)}</ChartCenter>
      </ChartCavnas>
      {legendData && (
        <ChartLegend data={legendData} currentIndex={currentIndex} onClick={setCurrentIndex} />
      )}
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
