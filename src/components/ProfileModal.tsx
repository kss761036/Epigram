'use client';

import Avatar from './Avatar';
import Icon from './Icon';
import ModalBase from './ModalBase';

interface ProfileModalProps {
  isOpen: boolean;
  writer: {
    image?: string;
    nickname?: string;
  };
  onClose: () => void;
  className?: string;
}

export default function ProfileModal({ isOpen, writer, onClose }: ProfileModalProps) {
  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      className='max-w-[300px] px-6 pt-4 pb-6 md:max-w-[328px] lg:max-w-[360px] lg:px-10 lg:pt-6 lg:pb-8'
    >
      <div className='flex justify-end'>
        <button onClick={onClose} className='cursor-pointer'>
          <Icon name='close' size={20} />
        </button>
      </div>

      <div className='mt-2 flex flex-col items-center justify-center gap-6'>
        <Avatar src={writer.image} alt={writer.nickname} className='border border-blue-300' />
        <p className='text-black-400 text-lg font-semibold lg:text-xl'>{writer.nickname}</p>
      </div>
    </ModalBase>
  );
}
