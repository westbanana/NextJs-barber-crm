'use client';

import React from 'react';
import {
  useForm, FieldErrors, FieldValues, DefaultValues, Control,
} from 'react-hook-form';

import { classNames } from '@lib/classNames/classNames';
import cls from '@components/ui/Card/style.module.scss';

type FormProps<T extends FieldValues> = {
  initialState: DefaultValues<T>;
  onSubmit: (data: T) => void; // Добавлен новый пропс onSubmit
  children:
    React.ReactNode |
    ((props: {
      control: Control<T>,
      errors: FieldErrors<T>
    }) => React.ReactNode); // Пропсы для children
};

const Form = <T extends FieldValues, >({ children, initialState, onSubmit }: FormProps<T>) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: initialState, mode: 'onChange' });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classNames(cls.form, {}, [])}>
      {typeof children === 'function' ? (
        children({
          control, errors,
        })
      ) : children}
    </form>
  );
};
export default Form;
