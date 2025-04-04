import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import ProfileModal from './ProfileModal';

const meta: Meta<typeof ProfileModal> = {
  component: ProfileModal,
  title: 'Components/ProfileModal',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '프로필 모달 컴포넌트',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 표시 여부',
    },
    writer: {
      description: '댓글 작성자 정보 (프로필이미지, 닉네임)',
      table: {
        type: { summary: 'object' },
      },
      control: 'object',
    },
    onClose: { action: 'onClose' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileModal>;

export const Default: Story = {
  args: {
    isOpen: false,
    writer: { nickname: '파울로 코엘료' },
  },
  render: function Render(args) {
    const [{ isOpen }, updateArgs] = useArgs();

    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => updateArgs({ isOpen: false });

    return (
      <div className='flex h-[200px] items-center justify-center'>
        <button
          className='cursor-pointer rounded-lg bg-blue-900 px-4 py-2 font-medium text-white'
          onClick={handleOpen}
        >
          Open Modal
        </button>
        <ProfileModal {...args} isOpen={isOpen} onClose={handleClose} />
      </div>
    );
  },
};
