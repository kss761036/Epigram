import type { Meta, StoryObj } from '@storybook/react';
import { TabList, TabBtn, TabItemsContainer, TabItem } from './Tab';

const meta: Meta = {
  title: 'Components/Tab',
  tags: ['autodocs'],
  component: TabList,
  argTypes: {
    TabList: { control: 'text', description: 'tab버튼을 감싸는 ul태그의 추가 클래스' },
    TabBtn: {
      control: 'text',
      description: 'tab버튼 button태그 추가 클래스 (li태그 아님)',
    },
    TabBtnActive: { control: 'text', description: '활성화된 tab버튼 추가 클래스' },
    TabItemsContainer: {
      control: 'text',
      description: 'tab컨텐츠를 감싸는 ul태그의 추가 클래스',
    },
    TabItem: { control: 'text', description: 'tab컨텐츠 li태그의 추가 클래스' },
    TabItemAnimation: {
      control: 'object',
      description:
        'tab컨텐츠 li태그의 애니메이션 설정 <br /> enabled: 애니메이션 여부 <br /> direction: 애니메이션 방향 <br /> directionValue: 애니메이션 값 <br /> duration: 애니메이션 시간',
      table: {
        type: {
          summary: 'object',
          detail:
            '{ enabled?: boolean; direction?: "x" | "y"; directionValue?: number; duration?: number; }',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<{
  TabList: string;
  TabBtn: string;
  TabBtnActive: string;
  TabItemsContainer: string;
  TabItem: string;
  TabItemAnimation: {
    enabled: boolean;
    direction: 'x' | 'y';
    directionValue: number;
    duration: number;
  };
}>;

export const Default: Story = {
  render: (args) => (
    <>
      <TabList className={args.TabList}>
        <TabBtn tabIndex={0} className={args.TabBtn} activeClass={args.TabBtnActive}>
          내 에피그램(10)
        </TabBtn>
        <TabBtn tabIndex={1} className={args.TabBtn} activeClass={args.TabBtnActive}>
          내 댓글(110)
        </TabBtn>
      </TabList>
      <TabItemsContainer className={args.TabItemsContainer}>
        <TabItem tabIndex={0} className={args.TabItem} animation={args.TabItemAnimation}>
          에피그램 리스트
        </TabItem>
        <TabItem tabIndex={1} className={args.TabItem} animation={args.TabItemAnimation}>
          댓글 리스트
        </TabItem>
      </TabItemsContainer>
    </>
  ),
  args: {
    TabList: '',
    TabBtn: '',
    TabBtnActive: '',
    TabItemsContainer: '',
    TabItem: '',
    TabItemAnimation: {
      enabled: true,
      direction: 'y',
      directionValue: 20,
      duration: 0.25,
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'TabList, TabBtn, TabItemsContainer, TabItem을 사용하여 기본적인 탭 구조를 만드는 예제. 프롭스를 조정하여 원하는 스타일을 적용할 수 있습니다.',
      },
    },
  },
};
