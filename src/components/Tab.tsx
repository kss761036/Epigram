'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils/helper';

interface TabListProps {
  children: React.ReactNode;
  className?: string;
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

interface TabBtnProps {
  children: React.ReactNode;
  className?: string;
  activeClass?: string;
  index: number;
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
  index: number;
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

export function TabList({ children, className, activeTab, setActiveTab }: TabListProps) {
  const tabs = React.Children.toArray(children);
  const totalTabs = tabs.length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextTab = (activeTab + 1) % totalTabs;
      setActiveTab(nextTab);
      (document.querySelectorAll('[role="tab"]')[nextTab] as HTMLButtonElement)?.focus();
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevTab = (activeTab - 1 + totalTabs) % totalTabs;
      setActiveTab(prevTab);
      (document.querySelectorAll('[role="tab"]')[prevTab] as HTMLButtonElement)?.focus();
    }
  };
  return (
    <ul
      className={cn('md:gap:6 mb-6 flex flex-wrap gap-4 md:mb-8 lg:mb-12', className)}
      role='tablist'
      onKeyDown={handleKeyDown}
    >
      {children}
    </ul>
  );
}

export function TabBtn({
  children,
  activeClass,
  className,
  index,
  activeTab,
  setActiveTab,
}: TabBtnProps) {
  const active = 'text-black-600 font-semibold';
  const isActive = activeTab === index;

  return (
    <li>
      <button
        role='tab'
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        className={cn(
          'cursor-pointer leading-5 font-medium text-gray-300 transition-all duration-100',
          isActive && active,
          isActive && activeClass,
          className,
        )}
        onClick={() => setActiveTab(index)}
        onFocus={() => setActiveTab(index)}
      >
        {children}
      </button>
    </li>
  );
}

export function TabItemsContainer({ children, className }: TabItemsContainerProps) {
  return <ul className={className}>{children}</ul>;
}

export function TabItem({ children, className, index, activeTab, animation }: TabItemProps) {
  const isActive = activeTab === index;
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
