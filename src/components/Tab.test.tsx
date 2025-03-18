import { render, screen, fireEvent } from '@testing-library/react';
import { TabList, TabBtn, TabItemsContainer, TabItem } from '@/components/Tab';
import { useTabStore } from '@/components/Tab';

const resetTabStore = () => {
  useTabStore.setState({ activeTab: 0 });
};

describe('Tab 컴포넌트 테스트', () => {
  beforeEach(() => {
    resetTabStore();
  });

  it('탭 버튼을 클릭하면 활성화 상태가 변경되어야 한다', () => {
    render(
      <TabList>
        <TabBtn tabIndex={0}>탭 1</TabBtn>
        <TabBtn tabIndex={1}>탭 2</TabBtn>
      </TabList>,
    );

    const tabButton = screen.getByText('탭 2');
    fireEvent.click(tabButton);

    expect(useTabStore.getState().activeTab).toBe(1);
  });

  it('활성화된 탭 아이템만 표시되어야 한다', () => {
    useTabStore.setState({ activeTab: 1 });

    render(
      <TabItemsContainer>
        <TabItem tabIndex={0}>내용 1</TabItem>
        <TabItem tabIndex={1}>내용 2</TabItem>
      </TabItemsContainer>,
    );

    expect(screen.queryByText('내용 1')).not.toBeInTheDocument();
    expect(screen.getByText('내용 2')).toBeInTheDocument();
  });
});
