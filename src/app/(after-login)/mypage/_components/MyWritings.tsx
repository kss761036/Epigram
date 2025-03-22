'use client';

import React, { useState, useEffect } from 'react';
import { TabBtn, TabItem, TabItemsContainer, TabList, Tabs } from '@/components/Tab';
import MyEpigrams from './MyEpigrams';
import MyComments from './MyComments';
import { getEpigrams } from '@/apis/epigram/epigram.service';
import { getUserCommentsById } from '@/apis/user/user.service';
import { useSession } from 'next-auth/react';

export default function MyWritings() {
  const [activeTab, setActiveTab] = useState(0);
  const [epigramsCount, setEpigramsCount] = useState<number | null>(null);
  const [commentsCount, setCommentsCount] = useState<number | null>(null);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchEpigramsCount = async () => {
      try {
        const response = await getEpigrams({ limit: 1, writerId: userId });
        setEpigramsCount(response.totalCount);
      } catch (error) {
        console.error('에피그램 개수 가져오기 실패:', error);
      }
    };

    const fetchCommentsCount = async () => {
      try {
        const response = await getUserCommentsById(userId, { limit: 1, cursor: undefined });
        setCommentsCount(response.totalCount);
      } catch (error) {
        console.error('댓글 개수 가져오기 실패:', error);
      }
    };
    fetchEpigramsCount();
    fetchCommentsCount();
  }, [userId]);

  return (
    <Tabs>
      <TabList>
        <TabBtn
          tabIndex={0}
          className='text-lg lg:text-2xl'
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        >
          내 에피그램({epigramsCount !== null ? epigramsCount : '...'})
        </TabBtn>
        <TabBtn
          tabIndex={1}
          className='text-lg lg:text-2xl'
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        >
          내 댓글({commentsCount !== null ? commentsCount : '...'})
        </TabBtn>
      </TabList>
      <TabItemsContainer>
        <TabItem tabIndex={0} activeTab={activeTab}>
          <MyEpigrams />
        </TabItem>
        <TabItem tabIndex={1} activeTab={activeTab}>
          <MyComments />
        </TabItem>
      </TabItemsContainer>
    </Tabs>
  );
}
