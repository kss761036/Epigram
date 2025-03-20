'use client';

import {
  ButtonHTMLAttributes,
  createContext,
  Dispatch,
  HTMLAttributes,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, HTMLMotionProps, motion } from 'motion/react';
import { cn } from '@/utils/helper';

const DropdownStateContext = createContext<{ isOpen: boolean } | null>(null);
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

  return (
    <DropdownStateContext.Provider value={{ isOpen }}>
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
      className={cn('group cursor-pointer leading-none', className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenu({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLMotionProps<'ul'>>) {
  const { isOpen } = useDropdownState();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.1 }}
          className={className}
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
  onClick,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLLIElement>>) {
  const { setIsOpen } = useDropdownDispatch();

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    onClick?.(e);
    setIsOpen(false);
  };
  return (
    <li onClick={handleClick} {...props}>
      {children}
    </li>
  );
}
