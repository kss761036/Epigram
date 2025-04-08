'use client';

import { useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import useModal from '@/hooks/useModal';
import useModalStore from '@/hooks/useModalStore';
import { focusTrap } from '@/utils/focusTrap';
import { cn } from '@/utils/helper';

interface ModalBaseProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  titleId?: string;
}

export default function ModalBase({
  children,
  isOpen: propIsOpen,
  onClose: propOnClose,
  className,
  titleId,
}: ModalBaseProps) {
  const { isOpen: storeIsOpen, close: storeClose } = useModalStore();
  const isOpen = propIsOpen ?? storeIsOpen;
  const onClose = propOnClose ?? storeClose;

  const { mounted } = useModal(isOpen, onClose);

  const modalRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLDivElement>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (isOpen) {
      previousFocusedElementRef.current = document.activeElement as HTMLElement;

      setTimeout(() => {
        if (modalRef.current) {
          const inputElement = modalRef.current.querySelector<HTMLElement>('input');
          if (inputElement) {
            inputElement.focus();
          } else {
            initialFocusRef.current?.focus();
          }
        }
      }, 0);
    } else {
      previousFocusedElementRef.current?.focus();
    }
  }, [isOpen]);

  const portalRoot =
    typeof document !== 'undefined' ? document.getElementById('portal-root') : null;

  if (!mounted || !portalRoot || !isOpen) return null;

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'
      onClick={onClose}
      data-testid='modal-overlay'
      aria-hidden={!isOpen}
    >
      <div
        ref={modalRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        className={cn(
          'w-full max-w-[320px] rounded-3xl bg-white px-[38px] py-8 md:max-w-[372px] lg:max-w-[452px] lg:py-10',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => focusTrap(e, modalRef.current)}
      >
        <div ref={initialFocusRef} tabIndex={-1}>
          {children}
        </div>
      </div>
    </div>,
    portalRoot,
  );
}
