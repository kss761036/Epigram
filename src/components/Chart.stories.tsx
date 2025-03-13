import { Meta, StoryObj } from '@storybook/react';
import { AnimatePresence, motion } from 'motion/react';
import Chart from './Chart';
import Emoji from './Emoji';
import { Emotion, EMOTION_LABEL } from '@/types/common';

const tempData = { MOVED: 10, HAPPY: 8, WORRIED: 6, SAD: 5, ANGRY: 3 };
const sortedData = (Object.entries(tempData) as [Emotion, number][]).sort(([, a], [, b]) => b - a);
const chartLabels = sortedData.map(([key]) => key);
const chartEmojiLabels = chartLabels.map((item) => (
  <Emoji key={item} name={item} className='w-4 lg:w-6' />
));
const chartData = sortedData.map(([, value]) => value);
const chartColors = ['#48BB98', '#FBC85B', '#C7D1E0', '#E3E9F1', '#EFF3F8'];

const meta: Meta<typeof Chart> = {
  component: Chart,
  title: 'Components/Chart',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '감정 차트 컴포넌트입니다. chart.js를 활용하였으며, data, colors, labels를 개별적으로 주입해야 합니다. 이 세 가지 데이터는 length가 같아야 하며, 서로 연관된 값들이 동일한 index를 가져야 올바르게 매칭됩니다. (이는 차트 라이브러리의 기본 동작 방식입니다.)',
      },
    },
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Chart>;

export const Default: Story = {
  args: {
    data: chartData,
    colors: chartColors,
    customCenter: (currentIndex) => {
      const name = chartLabels[currentIndex];
      return (
        <AnimatePresence mode='wait'>
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className='flex flex-col items-center justify-center gap-2 text-center text-lg font-bold'
          >
            <Emoji name={name} className='w-6 lg:w-10' />
            <span>{EMOTION_LABEL[name]}</span>
          </motion.div>
        </AnimatePresence>
      );
    },
  },
  decorators: (Story) => (
    <div className='mx-auto max-w-3xl'>
      <Story />
    </div>
  ),
};

export const CustomCenter: Story = {
  args: {
    data: chartData,
    colors: chartColors,
    customCenter: (currentIndex) => {
      const name = chartLabels[currentIndex];
      return (
        <AnimatePresence mode='wait'>
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.1 }}
            className='flex flex-col items-center justify-center gap-2 text-center text-lg font-bold'
          >
            <span>!!{EMOTION_LABEL[name]}!!</span>
          </motion.div>
        </AnimatePresence>
      );
    },
  },
  decorators: (Story) => (
    <div className='mx-auto max-w-3xl'>
      <Story />
    </div>
  ),
};

export const WithLegend: Story = {
  args: {
    data: chartData,
    colors: chartColors,
    labels: chartEmojiLabels,
    customCenter: (currentIndex) => {
      const name = chartLabels[currentIndex];
      return (
        <AnimatePresence mode='wait'>
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className='flex flex-col items-center justify-center gap-2 text-center text-lg font-bold'
          >
            <Emoji name={name} className='w-6 lg:w-10' />
            <span>{EMOTION_LABEL[name]}</span>
          </motion.div>
        </AnimatePresence>
      );
    },
  },
  decorators: (Story) => (
    <div className='mx-auto max-w-3xl'>
      <Story />
    </div>
  ),
};
