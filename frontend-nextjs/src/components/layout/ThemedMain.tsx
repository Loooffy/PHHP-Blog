'use client';

import type { Category } from '@/lib/theme';

interface ThemedMainProps {
  children: React.ReactNode;
  category?: Category;
}

export function ThemedMain({ children, category }: ThemedMainProps) {
  const scrollbarClass = category === 'film' ? 'film-scrollbar' : '';

  return (
    <main
      className={`fixed z-1100 top-[84px] inset-x-0 bottom-0 overflow-y-auto bg-background ${scrollbarClass}`}
    >
      {children}
    </main>
  );
}
