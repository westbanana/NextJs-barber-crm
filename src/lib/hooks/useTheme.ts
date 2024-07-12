'use client';

import { useEffect, useState } from 'react';

import { LOCAL_STORAGE_THEME_KEY } from '@/constants/local-storage-keys';

export enum Theme {
  DARK ='darkTheme',
  LIGHT = 'lightTheme',
  GREEN = 'greenTheme'
}

const defaultTheme = typeof window !== 'undefined'
  ? localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.DARK
  : Theme.DARK;
const useTheme = () => {
  const [theme, setTheme] = useState(defaultTheme);
  useEffect(() => {
    const removeClass = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    document.body.classList.remove(removeClass);
    document.body.classList.add(theme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev:Theme) => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  };

  return { theme, toggleTheme };
};
export default useTheme;
