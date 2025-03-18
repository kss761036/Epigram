import { TabList, TabBtn, TabItem, TabItemsContainer } from '@/components/Tab';

export default function Page() {
  return (
    <>
      <TabList>
        <TabBtn tabIndex={0}>내 에피그램(10)</TabBtn>
        <TabBtn tabIndex={1}>내 댓글(110)</TabBtn>
      </TabList>
      <TabItemsContainer>
        <TabItem
          tabIndex={0}
          className='border-black-900 flex h-30 w-full items-center justify-center border'
        >
          에피그램 리스트
        </TabItem>
        <TabItem
          tabIndex={1}
          className='border-black-900 flex h-30 w-full items-center justify-center border'
        >
          댓글 리스트
        </TabItem>
      </TabItemsContainer>
    </>
  );
}
