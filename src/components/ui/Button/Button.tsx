import React, { memo } from 'react';
import { Loader } from 'lucide-react';

import { classNames, Mods } from '@/lib/classNames/classNames';
import { AlignVerticalText, ButtonProps } from '@/components/ui/Button/button.type';

import cls from './style.module.scss';

const Button = memo(({
  children,
  disabled,
  className,
  loading = false,
  alignVerticalText = AlignVerticalText.CENTER,
  withoutBorder = false,
  ...otherProps
}:ButtonProps) => {
  const mods: Mods = {
    [cls.disabled]: disabled,
    [cls[alignVerticalText]]: true,
    [cls.withoutBorder]: withoutBorder,
  };
  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(cls.Button, mods, [className])}
      {...otherProps}
    >
      {loading
        ? (<Loader className={cls.loader} />)
        : children}
    </button>
  );
});

export default Button;
