import { ReactNode } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import TodayMood from './TodayMood';

function WithProviders({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}

const meta: Meta<typeof TodayMood> = {
  component: TodayMood,
  title: 'Components/TodayMood',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <WithProviders>
        <Story />
      </WithProviders>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: '오늘의 감정을 선택할 수 있는 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: '상단에 표시될 안내 문구',
    },
    containerClassName: {
      control: 'text',
      description: '버튼 컨테이너에 적용할 className',
    },
    labelClassName: {
      control: 'text',
      description: '라벨 텍스트에 적용할 className',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TodayMood>;

export const Default: Story = {
  args: {
    label: '오늘의 감정을 선택해 주세요',
  },
  parameters: {
    layout: 'centered',
  },
};
