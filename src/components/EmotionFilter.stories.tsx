import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Emotion } from '@/types/common';
import EmotionFilter from './EmotionFilter';

const meta: Meta<typeof EmotionFilter> = {
  component: EmotionFilter,
  title: 'Components/EmotionFilter',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '감정 선택 드롭다운입니다. 나타나는 판넬은 absolute로 셋팅되어있습니다. relative를 상위에 사용해주세요 (헤더에서 사용하면 헤더에 relative 셋팅을 하면 헤더의 가운데로 위치합니다.)',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmotionFilter>;

export const Default: Story = {
  render: function Render() {
    const [emotion, setEmotion] = useState<Emotion | null>(null);
    return (
      <div className='h-[200px]'>
        <div className='relative'>
          <EmotionFilter
            value={emotion}
            onChange={(value) => setEmotion(value === emotion ? null : value)}
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'centered',
  },
};
