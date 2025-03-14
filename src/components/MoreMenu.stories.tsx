import { Meta, StoryObj } from '@storybook/react';
import { MoreMenu, MoreMenuItem } from './MoreMenu';

const meta: Meta<typeof MoreMenu> = {
  component: MoreMenu,
  title: 'Components/MoreMenu',
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: '더보기(케밥메뉴) 드롭다운입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MoreMenu>;

export const Default: Story = {
  render: () => {
    return (
      <div className='h-[200px]'>
        <MoreMenu>
          <MoreMenuItem onClick={() => alert('수정합니다.')}>수정하기</MoreMenuItem>
          <MoreMenuItem onClick={() => alert('삭제합니다.')}>삭제하기</MoreMenuItem>
        </MoreMenu>
      </div>
    );
  },
  parameters: {
    layout: 'centered',
  },
};
