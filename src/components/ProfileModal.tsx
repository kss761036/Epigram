'use client';

import { createPortal } from 'react-dom';
import { cn } from '@/utils/helper';
import Icon from './Icon';
import Avatar from './Avatar';
import useModal from '@/hooks/useModal';

interface ProfileModalProps {
  isOpen: boolean;
  writer: {
    image?: string;
    nickname?: string;
  };
  onClose: () => void;
  className?: string;
}

export default function ProfileModal({ isOpen, writer, onClose, className }: ProfileModalProps) {
  const { mounted } = useModal(isOpen, onClose);

  const portalRoot =
    typeof document !== 'undefined' ? document.getElementById('portal-root') : null;

  if (!mounted || !portalRoot) return null;

  return createPortal(
    isOpen ? (
      <div
        className={cn(
          'fixed inset-0 z-100 flex items-center justify-center bg-black/60',
          className,
        )}
        onClick={onClose}
        data-testid='modal-overlay'
      >
        <div
          className='w-full max-w-[300px] rounded-3xl bg-white px-6 pt-4 pb-6 md:max-w-[328px] lg:max-w-[360px] lg:px-10 lg:pt-6 lg:pb-8'
          onClick={(e) => e.stopPropagation()}
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
        </div>
      </div>
    ) : null,
    portalRoot,
  );
}
