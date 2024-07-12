import React, { forwardRef, memo } from 'react';

import { InputProps } from '@/components/ui/Input/input.type';
import { classNames, Mods } from '@/lib/classNames/classNames';
import Label from '@components/ui/Label/Label';
import { FormFieldErrors } from '@constants/formFieldErrors';

import cls from './style.module.scss';

const Input = memo(forwardRef<HTMLInputElement, InputProps>(({
  label,
  id,
  className,
  error,
  value = '',
  ...otherProps
}, ref) => {
  const inputMods:Mods = {
    [cls.error]: error,
  };
  const errorMessage = error ? FormFieldErrors[error as keyof typeof FormFieldErrors] : undefined;

  return (
    <div className={classNames(cls.inputContainer, {}, [className])}>
      <Label className={cls.label} label={errorMessage || label!!} id={id!!} />
      <input
        ref={ref}
        id={id}
        className={classNames(cls.Input, inputMods, [])}
        value={value}
        {...otherProps}
      />
    </div>
  );
}));

export default Input;
