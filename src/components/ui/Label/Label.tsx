import React from 'react';

import { LabelProps } from '@components/ui/Label/label.type';
import { classNames, Mods } from '@lib/classNames/classNames';

import cls from './style.module.scss';

const Label = ({
  label, id, className, alwaysOnBorder = false, style,
}:LabelProps) => {
  const mods:Mods = {
    [cls.onBorder]: alwaysOnBorder,
  };
  return (
    <label
      htmlFor={id}
      style={style}
      className={classNames(cls.Label, mods, [className])}
    >
      {label}
    </label>
  );
};

export default Label;
