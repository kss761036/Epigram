'use client';

import { createPortal } from 'react-dom';
import useModal from '@/hooks/useModal';
import useModalStore from '@/hooks/useModalStore';
import { cn } from '@/utils/helper';

interface ModalBaseProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export default function ModalBase({
  children,
  isOpen: propIsOpen,
  onClose: propOnClose,
  className,
}: ModalBaseProps) {
  const { isOpen: storeIsOpen, close: storeClose } = useModalStore();

  const isOpen = propIsOpen ?? storeIsOpen;
  const onClose = propOnClose ?? storeClose;

  const { mounted } = useModal(isOpen, onClose);

  const portalRoot =
    typeof document !== 'undefined' ? document.getElementById('portal-root') : null;

  if (!mounted || !portalRoot || !isOpen) return null;

  return createPortal(
    <div
      className={'fixed inset-0 z-50 flex items-center justify-center bg-black/60'}
      onClick={onClose}
      data-testid='modal-overlay'
    >
      <div
        className={cn(
          'w-full max-w-[320px] rounded-3xl bg-white px-[38px] py-8 md:max-w-[372px] lg:max-w-[452px] lg:py-10',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    portalRoot,
  );
}
