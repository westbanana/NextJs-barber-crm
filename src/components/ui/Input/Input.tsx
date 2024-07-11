import React, { forwardRef, memo } from 'react';

import { InputProps } from '@/components/ui/Input/input.type';
import { classNames, Mods } from '@/lib/classNames/classNames';
import Label from '@components/ui/Label/Label';

import cls from './style.module.scss';

const Input = memo(forwardRef<HTMLInputElement, InputProps>(({
  label,
  id,
  className,
  error = false,
  ...otherProps
}, ref) => {
  const inputMods:Mods = {
    [cls.error]: error,
  };
  return (
    <div className={classNames(cls.inputContainer, {}, [className])}>
      <Label className={cls.label} label={label!!} id={id!!} />
      <input
        ref={ref}
        id={id}
        className={classNames(cls.Input, inputMods, [])}
        {...otherProps}
      />
    </div>
  );
}));

export default Input;
