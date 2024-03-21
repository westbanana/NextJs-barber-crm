import React from 'react';

import { LabelProps } from '@/components/Label/label.type';
import { classNames } from '@/lib/classNames/classNames';

import cls from './style.module.scss';

const Label = ({ label, id, className }:LabelProps) => (
  <label
    htmlFor={id}
    className={classNames(cls.Label, {}, [className])}
  >
    {label}
  </label>
);

export default Label;
