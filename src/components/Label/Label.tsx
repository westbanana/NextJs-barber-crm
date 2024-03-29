import React from 'react';

import { LabelProps } from '@/components/Label/label.type';
import { classNames, Mods } from '@/lib/classNames/classNames';

import cls from './style.module.scss';

const Label = ({
  label, id, className, alwaysOnBorder = false,
}:LabelProps) => {
  const mods:Mods = {
    [cls.onBorder]: alwaysOnBorder,
  };
  return (
    <label
      htmlFor={id}
      className={classNames(cls.Label, mods, [className])}
    >
      {label}
    </label>
  );
};

export default Label;
