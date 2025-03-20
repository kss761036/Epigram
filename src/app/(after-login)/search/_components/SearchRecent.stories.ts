import { Meta, StoryObj } from '@storybook/react';
import SearchRecent from './SearchRecent';

const meta: Meta<typeof SearchRecent> = {
  component: SearchRecent,
  title: 'Components/page/search/SearchRecent',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'search page : SearchRecent',
      },
    },
  },
  args: {
    recentKeywords: ['테스트 검색어1', '테스트 검색어2', '테스트 검색어3'],
    onClearRecentKeywords: () => console.log('검색어 모두 삭제'),
  },
};

export default meta;
type Story = StoryObj<typeof SearchRecent>;
export const Default: Story = {};
