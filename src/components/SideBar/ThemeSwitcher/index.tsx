import React from 'react';
import { Moon, Sun } from 'lucide-react';
import useTheme, { Theme } from '@/helpers/hooks/useTheme';

import cls from './style.module.scss';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cls.ThemeSwitcher}
    >
      {theme === Theme.DARK ? <Moon /> : <Sun />}
    </button>
  );
};

export default ThemeSwitcher;
