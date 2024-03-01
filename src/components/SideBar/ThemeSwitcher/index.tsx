import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

import useTheme, { Theme } from '@/lib/hooks/useTheme';

import cls from './style.module.scss';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return (
    <>
      {hasMounted && (
        <button
          type="button"
          onClick={toggleTheme}
          className={cls.ThemeSwitcher}
        >
          {theme === Theme.LIGHT ? <Sun /> : <Moon />}
        </button>
      )}
    </>
  );
};

export default ThemeSwitcher;
