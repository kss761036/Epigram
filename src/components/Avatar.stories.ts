import { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Components/Avatar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Avatar 컴포넌트',
      },
    },
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wikied/user/1269/1741694256600/profile.png',
    alt: '김찬기',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          '기본 사이즈는 48x48(px)입니다. 추가적인 사이즈 조절은 classname으로 tailwind css를 사용해주세요.',
      },
    },
  },
};

export const FallbackCharacter: Story = {
  args: {
    src: 'https://error',
    alt: '김찬기',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '프로필 이미지가 error 또는 없으면, alt값의 첫글자가 fallback으로 표시됩니다.',
      },
    },
  },
};

export const FallbackDefault: Story = {
  args: {
    src: 'https://error',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '프로필 이미지가 error 또는 없을때, alt값도 없으면 기본 이미지가 표시됩니다..',
      },
    },
  },
};
