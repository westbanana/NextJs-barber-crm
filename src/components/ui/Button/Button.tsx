import React from 'react';

import { classNames, Mods } from '@/lib/classNames/classNames';
import { AlignVerticalText, ButtonProps } from '@/components/ui/Button/button.type';

import cls from './style.module.scss';

const Button = ({
  children,
  onClick,
  disabled,
  className,
  alignVerticalText = AlignVerticalText.CENTER,
}:ButtonProps) => {
  const mods: Mods = {
    [cls.disabled]: disabled,
    [cls[alignVerticalText]]: true,
  };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={classNames(cls.Button, mods, [className])}
    >
      {children}
    </button>
  );
};

export default Button;
