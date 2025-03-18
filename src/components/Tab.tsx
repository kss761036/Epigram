'use client';

import { cn } from '@/utils/helper';
import React, { useEffect, useState } from 'react';
import { create } from 'zustand';
import { AnimatePresence, motion } from 'framer-motion';

interface TabStore {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

export const useTabStore = create<TabStore>((set) => ({
  activeTab: 0,
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabBtnProps {
  children: React.ReactNode;
  className?: string;
  activeClass?: string;
  tabIndex: number;
}

interface TabItemsContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface TabItemProps {
  children: React.ReactNode;
  className?: string;
  tabIndex: number;
  animation?: {
    enabled?: boolean;
    direction?: 'x' | 'y';
    directionValue?: number;
    duration?: number;
  };
}

export function TabList({ children, className }: TabListProps) {
  return (
    <ul className={cn('md:gap:6 mb-6 flex flex-wrap gap-4 md:mb-8 lg:mb-12', className)}>
      {children}
    </ul>
  );
}

export function TabBtn({ children, activeClass, className, tabIndex }: TabBtnProps) {
  const active = 'text-black-600 font-semibold';

  const { activeTab, setActiveTab } = useTabStore();
  const isActive = activeTab === tabIndex;

  return (
    <>
      <li>
        <button
          tabIndex={tabIndex}
          className={cn(
            'cursor-pointer leading-5 font-medium text-gray-300 transition-all duration-100',
            isActive && active,
            isActive && activeClass,
            className,
          )}
          onClick={() => setActiveTab(tabIndex)}
        >
          {children}
        </button>
      </li>
    </>
  );
}

export function TabItemsContainer({ children, className }: TabItemsContainerProps) {
  return <ul className={className}>{children}</ul>;
}

export function TabItem({ children, className, tabIndex, animation }: TabItemProps) {
  const activeTab = useTabStore((state) => state.activeTab);
  const isActive = activeTab === tabIndex;
  const { enabled = true, direction = 'y', directionValue = 20, duration = 0.25 } = animation || {};

  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <AnimatePresence mode='wait'>
      <div className=''>
        {isActive && (
          <motion.li
            className={className}
            initial={
              isFirstRender ? {} : enabled ? { opacity: 0, [direction]: directionValue } : {}
            }
            animate={enabled ? { opacity: 1, y: 0, x: 0 } : {}}
            exit={enabled ? { opacity: 0, [direction]: [directionValue] } : {}}
            transition={{ duration: [duration], ease: 'easeInOut' }}
          >
            {children}
          </motion.li>
        )}
      </div>
    </AnimatePresence>
  );
}
