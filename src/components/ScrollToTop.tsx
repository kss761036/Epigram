'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);

    const scrollEls = document.querySelectorAll('[data-scroll-reset]');
    scrollEls.forEach((el) => {
      (el as HTMLElement).scrollTop = 0;
    });
  }, [pathname]);

  return null;
}
