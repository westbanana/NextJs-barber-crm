'use client';

import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '@/constants/local-storage-keys';

export enum Theme {
  DARK ='darkTheme',
  LIGHT = 'lightTheme',
}

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.DARK;

const useTheme = () => {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev:Theme) => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  };

  return { theme, toggleTheme };
};
export default useTheme;
