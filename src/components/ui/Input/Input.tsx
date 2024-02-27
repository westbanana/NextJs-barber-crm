import React from 'react';

import { InputProps } from '@/components/ui/Input/input.type';
import { classNames, Mods } from '@/lib/classNames/classNames';

import cls from './style.module.scss';

const Input = ({
  value = '', onChange, label, id,
}:InputProps) => {
  const mods:Mods = {
    [cls.empty]: !value,
  };
  return (
    <div className={classNames(cls.inputContainer, mods, [])}>
      <label
        htmlFor={id}
        className={cls.Label}
      >
        {label}
      </label>
      <input
        id={id}
        onChange={onChange}
        className={cls.Input}
        type="text"
        value={value}
      />
    </div>
  );
};

export default Input;
