'use client';

import { createPortal } from 'react-dom';
import useModal from '@/hooks/useModal';
import useModalStore from '@/hooks/useModalStore';

export default function ModalBase({ children }: { children: React.ReactNode }) {
  const { isOpen, close, type } = useModalStore();
  const { mounted } = useModal(isOpen, close);

  const portalRoot =
    typeof document !== 'undefined' ? document.getElementById('portal-root') : null;

  if (!mounted || !portalRoot || !isOpen) return null;

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'
      onClick={close}
    >
      <div
        className='w-full max-w-[320px] rounded-3xl bg-white px-[38px] py-8 md:max-w-[372px] lg:max-w-[452px] lg:py-10'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    portalRoot,
  );
}
