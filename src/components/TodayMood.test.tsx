import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import TodayMood from './TodayMood';

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  return {
    ...originalModule,
    useSession: jest.fn(() => ({
      data: { user: { id: 'mock-user-id' } },
    })),
    SessionProvider: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('@/apis/emotion/emotion.queries', () => ({
  useEmotionLogToday: () => ({ data: null }),
  useCreateEmotionLog: () => ({
    isPending: false,
    mutate: jest.fn(),
  }),
}));

describe('TodayMood 컴포넌트', () => {
  const renderWithProviders = (props = {}) => {
    const queryClient = new QueryClient();

    return render(
      <SessionProvider session={null}>
        <QueryClientProvider client={queryClient}>
          <TodayMood label='오늘의 감정을 선택해 주세요' {...props} />
        </QueryClientProvider>
      </SessionProvider>,
    );
  };

  it('라벨이 올바르게 렌더링된다', () => {
    renderWithProviders();
    const labelElement = screen.getByText('오늘의 감정을 선택해 주세요');
    expect(labelElement).toBeInTheDocument();
  });

  it('감정 버튼이 5개 렌더링된다', () => {
    renderWithProviders();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('containerClassName이 적용된다', () => {
    renderWithProviders({ containerClassName: 'custom-container' });
    const buttons = screen.getAllByRole('button');
    const container = buttons[0].parentElement?.parentElement;
    expect(container).toHaveClass('custom-container');
  });

  it('labelClassName이 적용된다', () => {
    renderWithProviders({ labelClassName: 'custom-label' });
    const labelElement = screen.getByText('오늘의 감정을 선택해 주세요');
    expect(labelElement).toHaveClass('custom-label');
  });
});
