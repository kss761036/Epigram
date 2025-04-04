import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Emotion } from '@/types/common';
import Calendar from './Calendar';

const sampleMoodData: Record<string, Emotion> = {
  '2025-02-23': 'MOVED',
  '2025-02-24': 'MOVED',
  '2025-02-25': 'MOVED',
  '2025-02-26': 'WORRIED',
  '2025-02-27': 'ANGRY',
  '2025-02-28': 'ANGRY',
  '2025-03-01': 'HAPPY',
  '2025-03-03': 'HAPPY',
  '2025-03-05': 'WORRIED',
  '2025-03-07': 'SAD',
  '2025-03-09': 'SAD',
  '2025-03-10': 'SAD',
  '2025-03-11': 'SAD',
  '2025-03-12': 'ANGRY',
  '2025-03-13': 'ANGRY',
  '2025-03-15': 'ANGRY',
  '2025-03-17': 'ANGRY',
  '2025-03-19': 'ANGRY',
  '2025-03-21': 'ANGRY',
  '2025-03-22': 'ANGRY',
  '2025-03-23': 'ANGRY',
  '2025-03-24': 'ANGRY',
  '2025-03-25': 'ANGRY',
  '2025-03-26': 'ANGRY',
  '2025-03-27': 'ANGRY',
  '2025-03-28': 'ANGRY',
  '2025-03-29': 'ANGRY',
  '2025-03-30': 'ANGRY',
  '2025-04-01': 'ANGRY',
  '2025-04-02': 'ANGRY',
  '2025-04-03': 'ANGRY',
  '2025-04-04': 'ANGRY',
  '2025-04-05': 'ANGRY',
};

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'Components/Calendar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '캘린더 컴포넌트',
      },
    },
  },
  argTypes: {
    moodData: {
      control: 'object',
      description: '월별 감정 데이터.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const CalendarWrapper = ({ moodData }: { moodData?: Record<string, Emotion> }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  return (
    <Calendar moodData={moodData} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
  );
};

export const Default: Story = {
  render: () => <CalendarWrapper />,
};

export const WithMoodData: Story = {
  render: () => <CalendarWrapper moodData={sampleMoodData} />,
};
