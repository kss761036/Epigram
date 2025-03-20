import { Meta, StoryObj } from '@storybook/react';
import SearchHeader from './SearchHeader';

const meta: Meta<typeof SearchHeader> = {
  component: SearchHeader,
  title: 'Components/page/search/SearchHeader',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'search page : SearchHeader',
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    keyword: '테스트 검색어',
    onSaveRecentKeyword: (keyword) => console.log('검색어 저장:', keyword),
  },
};

export default meta;
type Story = StoryObj<typeof SearchHeader>;
export const Default: Story = {};

export const WithKeyword: Story = {
  args: {
    keyword: '기존 검색어',
  },
};
