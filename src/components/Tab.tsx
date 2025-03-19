'use client';

import { cn } from '@/utils/helper';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabBtnProps {
  children: React.ReactNode;
  className?: string;
  activeClass?: string;
  tabIndex: number;
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

interface TabItemsContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface TabItemProps {
  children: React.ReactNode;
  className?: string;
  tabIndex: number;
  activeTab: number;
  animation?: {
    enabled?: boolean;
    direction?: 'x' | 'y';
    directionValue?: number;
    duration?: number;
  };
}

export function Tabs({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement<{ activeTab: number; setActiveTab: (tab: number) => void }>(child)
        ) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </>
  );
}

export function TabList({ children, className }: TabListProps) {
  return (
    <ul className={cn('md:gap:6 mb-6 flex flex-wrap gap-4 md:mb-8 lg:mb-12', className)}>
      {children}
    </ul>
  );
}

export function TabBtn({
  children,
  activeClass,
  className,
  tabIndex,
  activeTab,
  setActiveTab,
}: TabBtnProps) {
  const active = 'text-black-600 font-semibold';
  const isActive = activeTab === tabIndex;

  return (
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
  );
}

export function TabItemsContainer({ children, className }: TabItemsContainerProps) {
  return <ul className={className}>{children}</ul>;
}

export function TabItem({ children, className, tabIndex, activeTab, animation }: TabItemProps) {
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
            exit={enabled ? { opacity: 0, [direction]: directionValue } : {}}
            transition={{ duration, ease: 'easeInOut' }}
          >
            {children}
          </motion.li>
        )}
      </div>
    </AnimatePresence>
  );
}
