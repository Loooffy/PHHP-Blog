'use client';

import {
  Category,
  ThemeMode,
  canToggleTheme,
  getCategoryFromPath,
  getTheme,
  resolveThemeMode,
} from '@/lib/theme';
import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';

const DEV_MODE_STORAGE_KEY = 'blog-theme-mode';

interface ThemeContextType {
  category: Category;
  mode: ThemeMode;
  canToggle: boolean;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyTheme(category: Category, mode: ThemeMode) {
  if (typeof window === 'undefined') return;

  const theme = getTheme(category, mode);
  const root = document.documentElement;

  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-secondary', theme.colors.secondary);
  root.style.setProperty('--color-background', theme.colors.background);
  root.style.setProperty('--color-surface', theme.colors.surface);
  root.style.setProperty('--color-text', theme.colors.text);
  root.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
  root.style.setProperty('--color-border', theme.colors.border);
  root.style.setProperty('--color-accent', theme.colors.accent);
  root.style.setProperty('--color-tag-hover-bg', theme.colors.tagHoverBg);
  root.style.setProperty('--color-tag-hover-text', theme.colors.tagHoverText);
  root.style.setProperty('--font-heading', theme.fonts.heading);
  root.style.setProperty('--font-body', theme.fonts.body);
  root.setAttribute('data-theme', `${category}-${mode}`);
}

function readDevMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light';

  const saved = localStorage.getItem(DEV_MODE_STORAGE_KEY) as ThemeMode | null;
  if (saved === 'light' || saved === 'dark') return saved;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const category = getCategoryFromPath(pathname);
  const [devMode, setDevMode] = useState<ThemeMode>(readDevMode);

  const mode = resolveThemeMode(pathname, devMode);
  const canToggle = canToggleTheme(pathname);

  useLayoutEffect(() => {
    applyTheme(category, mode);
  }, [category, mode]);

  useEffect(() => {
    localStorage.setItem(DEV_MODE_STORAGE_KEY, devMode);
  }, [devMode]);

  const toggleMode = () => {
    if (!canToggleTheme(pathname)) return;
    setDevMode((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ category, mode, canToggle, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
