import { useEffect, useState } from 'react';

export default function useModal(isOpen: boolean, onClose: () => void) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      const modal = document.getElementById('modal-content');
      if (modal && !modal.contains(e.target as Node)) {
        onClose();
      }
    };

    const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

    const getFixedElements = () => {
      return Array.from(document.querySelectorAll<HTMLElement>('*')).filter(
        (el) => getComputedStyle(el).position === 'fixed',
      );
    };

    if (isOpen) {
      const scrollbarWidth = getScrollbarWidth();
      const fixedElements = getFixedElements();

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      fixedElements.forEach((el) => {
        el.style.paddingRight = `${scrollbarWidth}px`;
      });

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('click', handleClickOutside);
    } else {
      const fixedElements = getFixedElements();

      document.body.style.overflow = '';
      document.body.style.paddingRight = '';

      fixedElements.forEach((el) => {
        el.style.paddingRight = '';
      });

      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClickOutside);
    }

    return () => {
      const fixedElements = getFixedElements();

      document.body.style.overflow = '';
      document.body.style.paddingRight = '';

      fixedElements.forEach((el) => {
        el.style.paddingRight = '';
      });

      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return { mounted };
}
