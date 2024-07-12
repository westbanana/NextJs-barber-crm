'use client';

import React from 'react';
import {
  useForm, FieldErrors, FieldValues, DefaultValues, Control, UseFormHandleSubmit, UseFormSetValue,
} from 'react-hook-form';

import { classNames } from '@lib/classNames/classNames';
import cls from '@components/ui/Card/style.module.scss';

type FormProps<T extends FieldValues> = {
  initialState: DefaultValues<T>;
  children:
    React.ReactNode |
    ((props: {
      control: Control<T>,
      errors: FieldErrors<T>,
      handleSubmit: UseFormHandleSubmit<T>
      setValue: UseFormSetValue<T>
    }) => React.ReactNode);
};

const Form = <T extends FieldValues, >({ children, initialState }: FormProps<T>) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: initialState, mode: 'onChange' });
  return (
    <form className={classNames(cls.form, {}, [])}>
      {typeof children === 'function' ? (
        children({
          control, errors, handleSubmit, setValue,
        })
      ) : children}
    </form>
  );
};
export default Form;
