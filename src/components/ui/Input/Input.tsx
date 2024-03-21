import React, { memo } from 'react';

import { InputProps } from '@/components/ui/Input/input.type';
import { classNames, Mods } from '@/lib/classNames/classNames';
import Label from '@/components/Label/Label';

import cls from './style.module.scss';

const Input = memo(({
  value = '', onChange, label, id, className, ...otherProps
}:InputProps) => {
  const mods:Mods = {};
  return (
    <div className={classNames(cls.inputContainer, mods, [className])}>
      <Label className={cls.label} label={label!!} id={id!!} />
      <input
        {...otherProps}
        id={id}
        onChange={onChange}
        className={cls.Input}
        value={value}
      />
    </div>
  );
});

export default Input;
