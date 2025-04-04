import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchResult from './SearchResult';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true } },
});

const mockInfiniteData = {
  pages: [
    {
      list: [
        {
          likeCount: 0,
          id: 1007,
          content: '333테스트2 에피그램',
          author: '저자',
          referenceTitle: '출처제목',
          referenceUrl: 'https://naver.com',
          writerId: 1269,
          tags: [{ id: 52, name: '태그1' }],
        },
        {
          likeCount: 0,
          id: 1006,
          content: '333테스트2 에피그램',
          author: '저자',
          referenceTitle: '출처제목',
          referenceUrl: 'https://naver.com',
          writerId: 1269,
          tags: [{ id: 52, name: '태그1' }],
        },
        {
          likeCount: 0,
          id: 1005,
          content: '333테스트2 에피그램',
          author: '저자',
          referenceTitle: '출처제목',
          referenceUrl: 'https://naver.com',
          writerId: 1269,
          tags: [{ id: 52, name: '태그1' }],
        },
        {
          likeCount: 0,
          id: 1004,
          content: '333테스트2 에피그램',
          author: '저자',
          referenceTitle: '출처제목',
          referenceUrl: 'https://naver.com',
          writerId: 1269,
          tags: [{ id: 52, name: '태그1' }],
        },
        {
          likeCount: 0,
          id: 1003,
          content: '333테스트2 에피그램',
          author: '저자',
          referenceTitle: '출처제목',
          referenceUrl: 'https://naver.com',
          writerId: 1269,
          tags: [
            { id: 24, name: '태그2' },
            { id: 52, name: '태그1' },
          ],
        },
        {
          likeCount: 0,
          id: 1002,
          content: '333테스트2 에피그램',
          author: '저자',
          referenceTitle: '출처제목',
          referenceUrl: 'https://naver.com',
          writerId: 1269,
          tags: [
            { id: 24, name: '태그2' },
            { id: 52, name: '태그1' },
          ],
        },
      ],
      nextCursor: null,
      totalCount: 19,
    },
  ],
  pageParams: [null],
};
const testKeyword = '테스트';

const meta: Meta<typeof SearchResult> = {
  component: SearchResult,
  title: 'Components/page/search/SearchResult',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'search page : SearchResult',
      },
    },
  },
  args: {
    keyword: testKeyword,
  },
};

export default meta;
type Story = StoryObj<typeof SearchResult>;
export const Default: Story = {
  decorators: [
    (Story) => {
      queryClient.clear();
      queryClient.setQueryData(['search', { limit: 6, keyword: testKeyword }], mockInfiniteData);
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};
