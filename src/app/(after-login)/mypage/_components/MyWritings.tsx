'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useEpigramWriterFilterInfiniteQuery } from '@/apis/epigram/epigram.queries';
import { useUserCommentsByIdInFiniteQuery } from '@/apis/user/user.queries';
import { TabBtn, TabItem, TabItemsContainer, TabList, Tabs } from '@/components/Tab';
import CommentList from './CommentList';
import MyEpigrams from './MyEpigrams';

export default function MyWritings() {
  const [activeTab, setActiveTab] = useState(0);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const {
    data: epigramData,
    isFetching: isFetchingEpigrams,
    hasNextPage: hasNextEpigramPage,
    fetchNextPage: fetchNextEpigramPage,
  } = useEpigramWriterFilterInfiniteQuery(
    userId ? { writerId: userId, limit: 4 } : { writerId: 0, limit: 4 },
  );

  const epigrams = epigramData?.pages.flatMap((page) => page.list) ?? [];
  const myEpigramsCount = epigramData?.pages?.[0]?.totalCount ?? 0;

  const {
    data: commentData,
    isFetching: isFetchingComments,
    hasNextPage: hasNextCommentPage,
    fetchNextPage: fetchNextCommentPage,
  } = useUserCommentsByIdInFiniteQuery(userId ? { userId, limit: 4 } : { userId: 0, limit: 4 });

  const comments = commentData?.pages.flatMap((page) => page.list) ?? [];
  const CommentListCount = commentData?.pages?.[0]?.totalCount ?? 0;

  console.log('comments', comments);
  console.log('epigrams', epigrams);
  return (
    <Tabs>
      <TabList>
        <TabBtn
          tabIndex={0}
          className='text-lg lg:text-2xl'
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        >
          내 에피그램({myEpigramsCount})
        </TabBtn>
        <TabBtn
          tabIndex={1}
          className='text-lg lg:text-2xl'
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        >
          내 댓글({CommentListCount})
        </TabBtn>
      </TabList>
      <TabItemsContainer>
        <TabItem tabIndex={0} activeTab={activeTab}>
          <MyEpigrams
            epigrams={epigrams}
            isFetching={isFetchingEpigrams}
            hasNextPage={hasNextEpigramPage}
            fetchNextPage={fetchNextEpigramPage}
          />
        </TabItem>
        <TabItem tabIndex={1} activeTab={activeTab}>
          <CommentList
            linkToEpigram={true}
            comments={comments}
            isFetching={isFetchingComments}
            hasNextPage={hasNextCommentPage}
            fetchNextPage={fetchNextCommentPage}
          />
        </TabItem>
      </TabItemsContainer>
    </Tabs>
  );
}
