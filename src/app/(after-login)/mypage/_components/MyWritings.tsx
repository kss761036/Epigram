import { TabBtn, TabItem, TabItemsContainer, TabList, Tabs } from '@/components/Tab';

export default function MyWritings() {
  return (
    <div className=''>
      <Tabs>
        <TabList className=''>
          <TabBtn
            activeClass=''
            activeTab={0}
            className='text-lg lg:text-2xl'
            setActiveTab={() => {}}
            tabIndex={0}
          >
            내 에피그램(10)
          </TabBtn>
          <TabBtn
            activeClass=''
            activeTab={0}
            className='text-lg lg:text-2xl'
            setActiveTab={() => {}}
            tabIndex={1}
          >
            내 댓글(110)
          </TabBtn>
        </TabList>
        <TabItemsContainer className=''>
          <TabItem
            activeTab={0}
            animation={{
              direction: 'y',
              directionValue: 20,
              duration: 0.25,
              enabled: true,
            }}
            className=''
            tabIndex={0}
          >
            에피그램 리스트
          </TabItem>
          <TabItem
            activeTab={0}
            animation={{
              direction: 'y',
              directionValue: 20,
              duration: 0.25,
              enabled: true,
            }}
            className=''
            tabIndex={1}
          >
            댓글 리스트
          </TabItem>
        </TabItemsContainer>
      </Tabs>
    </div>
  );
}
