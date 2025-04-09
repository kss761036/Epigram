import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TabList, TabBtn, TabItemsContainer, TabItem, Tabs } from '@/components/Tab';

describe('Tab 컴포넌트 테스트', () => {
  it('탭 버튼을 클릭하면 활성화 상태가 변경되어야 한다', () => {
    const TestComponent = () => {
      const [activeTab, setActiveTab] = useState(0);
      return (
        <Tabs>
          <TabList activeTab={activeTab} setActiveTab={setActiveTab}>
            <TabBtn index={0} activeTab={activeTab} setActiveTab={setActiveTab}>
              탭 1
            </TabBtn>
            <TabBtn index={1} activeTab={activeTab} setActiveTab={setActiveTab}>
              탭 2
            </TabBtn>
          </TabList>
        </Tabs>
      );
    };

    render(<TestComponent />);

    const tabButton = screen.getByText('탭 2');
    fireEvent.click(tabButton);

    expect(tabButton).toHaveClass('text-black-600 font-semibold');
  });

  it('활성화된 탭 아이템만 표시되어야 한다', () => {
    const TestComponent = () => {
      const [activeTab, setActiveTab] = useState(1);
      return (
        <Tabs>
          <TabItemsContainer>
            <TabItem index={0} activeTab={activeTab}>
              내용 1
            </TabItem>
            <TabItem index={1} activeTab={activeTab}>
              내용 2
            </TabItem>
          </TabItemsContainer>
        </Tabs>
      );
    };

    render(<TestComponent />);

    expect(screen.queryByText('내용 1')).not.toBeInTheDocument();
    expect(screen.getByText('내용 2')).toBeInTheDocument();
  });

  it('Tabs children이 React 엘리먼트가 아닐 때 그대로 렌더링되어야 한다', () => {
    const invalidChild = '이것은 React 엘리먼트가 아님';
    const { container } = render(<Tabs>{invalidChild}</Tabs>);

    expect(container).toHaveTextContent(invalidChild);
  });

  it('Tabs children이 null일 때 정상적으로 렌더링되어야 한다', () => {
    const { container } = render(<Tabs>{null}</Tabs>);

    expect(container).toBeEmptyDOMElement();
  });

  it('Tabs children이 undefined일 때 정상적으로 렌더링되어야 한다', () => {
    const { container } = render(<Tabs>{undefined}</Tabs>);

    expect(container).toBeEmptyDOMElement();
  });
});
