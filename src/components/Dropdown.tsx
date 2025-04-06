'use client';

import {
  ButtonHTMLAttributes,
  createContext,
  Dispatch,
  HTMLAttributes,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, HTMLMotionProps, motion } from 'motion/react';
import { cn } from '@/utils/helper';

const DropdownStateContext = createContext<{
  isOpen: boolean;
  dropdownRef: RefObject<HTMLDivElement | null>;
} | null>(null);
const DropdownDispatchContext = createContext<{
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

function useDropdownState() {
  const context = useContext(DropdownStateContext);
  if (!context) {
    throw new Error('드롭다운 컨텍스트는 드롭다운 컨텍스트 프로바이더 내부에서 사용해주세요');
  }
  return context;
}

function useDropdownDispatch() {
  const context = useContext(DropdownDispatchContext);
  if (!context) {
    throw new Error('드롭다운 컨텍스트는 드롭다운 컨텍스트 프로바이더 내부에서 사용해주세요');
  }
  return context;
}

export function Dropdown({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;

      e.preventDefault();

      if (e.key === 'Tab' || e.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <DropdownStateContext.Provider value={{ isOpen, dropdownRef }}>
      <DropdownDispatchContext.Provider value={{ setIsOpen }}>
        <div ref={dropdownRef} {...props}>
          {children}
        </div>
      </DropdownDispatchContext.Provider>
    </DropdownStateContext.Provider>
  );
}

export function DropdownTrigger({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  const { isOpen } = useDropdownState();
  const { setIsOpen } = useDropdownDispatch();

  return (
    <button
      type='button'
      onClick={() => setIsOpen((prev) => !prev)}
      aria-expanded={isOpen}
      aria-haspopup='true'
      className={cn('group cursor-pointer leading-none', className)}
      data-dropdown-trigger
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenu({
  children,
  className,
  direction = 'vertical',
  ...props
}: PropsWithChildren<HTMLMotionProps<'ul'> & { direction?: 'vertical' | 'horizontal' }>) {
  const { isOpen, dropdownRef } = useDropdownState();
  const menuRef = useRef<HTMLUListElement>(null);

  const focusFirstElement = () => {
    if (menuRef.current) {
      const focusable = menuRef.current.querySelector<HTMLElement>(
        'button, [href], [tabindex="0"]',
      );
      focusable?.focus();
    }
  };

  const focusTrigger = () => {
    dropdownRef.current?.querySelector<HTMLButtonElement>('[data-dropdown-trigger]')?.focus();
  };

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const menu = menuRef.current;

    function handleKeyDown(e: KeyboardEvent) {
      const focusable = Array.from(
        menu.querySelectorAll<HTMLElement>('button, [href], [tabindex="0"]'),
      );
      const currentIndex = focusable.findIndex((el) => el === document.activeElement);

      if (currentIndex === -1) return;

      const isForward =
        (direction === 'vertical' && e.key === 'ArrowDown') ||
        (direction === 'horizontal' && e.key === 'ArrowRight');

      const isBackward =
        (direction === 'vertical' && e.key === 'ArrowUp') ||
        (direction === 'horizontal' && e.key === 'ArrowLeft');

      const focusableLength = focusable.length;
      let targetIndex: number | null = null;

      if (isForward) {
        targetIndex = currentIndex + 1 < focusableLength ? currentIndex + 1 : 0;
      } else if (isBackward) {
        targetIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : focusableLength - 1;
      }

      if (targetIndex !== null) {
        e.preventDefault();
        focusable[targetIndex]?.focus();
      }
    }

    menu.addEventListener('keydown', handleKeyDown);
    return () => {
      menu.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, direction]);

  return (
    <AnimatePresence onExitComplete={focusTrigger}>
      {isOpen && (
        <motion.ul
          ref={menuRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.1 }}
          className={className}
          role='menu'
          onAnimationComplete={focusFirstElement}
          {...props}
        >
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}

export function DropdownItem({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLLIElement>>) {
  const { setIsOpen } = useDropdownDispatch();

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <li onClick={handleClick} {...props}>
      {children}
    </li>
  );
}
