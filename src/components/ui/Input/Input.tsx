import React, { forwardRef, memo } from 'react';

import { InputProps } from '@/components/ui/Input/input.type';
import { classNames, Mods } from '@/lib/classNames/classNames';
import Label from '@/components/Label/Label';

import cls from './style.module.scss';

const Input = memo(forwardRef<HTMLInputElement, InputProps>(({
  label,
  id,
  className,
  ...otherProps
}, ref) => {
  const mods:Mods = {};
  return (
    <div className={classNames(cls.inputContainer, mods, [className])}>
      <Label className={cls.label} label={label!!} id={id!!} />
      <input
        ref={ref}
        id={id}
        className={cls.Input}
        {...otherProps}
      />
    </div>
  );
}));

export default Input;
