'use client';

import React, { memo, useEffect, useRef } from 'react';
import { useFormik } from 'formik';

import Portal from '@/components/Portal';
import { EmployeeCardMode, EmployeeEditCardProps } from '@/components/EmployeeCard/employee-card.type';
import { outsideClick } from '@/helpers/outSideClick';
import { IEmployee } from '@/components/EmployeeList/EmployeeItem/employee.type';
import Input from '@/components/ui/Input/Input';
import UserIcon from '@/components/ui/UserIcon/UserIcon';
import Button from '@/components/ui/Button/Button';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { createEmployee } from '@/components/EmployeeList/services/createEmployee';
import { updateEmployee } from '@/components/EmployeeList/services/updateEmployee';

import cls from './style.module.scss';

const EmployeeCard = memo(({
  employeeData = {} as IEmployee,
  onClose,
  mode,
}:EmployeeEditCardProps) => {
  const dispatch = useAppDispatch();
  const refEditCard = useRef<HTMLFormElement>(null);

  const formik = useFormik({
    initialValues: employeeData,
    onSubmit: (values:IEmployee) => {
      if (mode === EmployeeCardMode.EDIT) {
        dispatch(updateEmployee(values));
      }
      if (mode === EmployeeCardMode.CREATE) {
        dispatch(createEmployee(values));
      }
    },
  });

  useEffect(() => {
    if (mode) {
      document.addEventListener('click', (e) => {
        outsideClick(e, onClose, refEditCard);
      });
    }
    return () => {
      document.removeEventListener('click', () => null);
    };
  }, [mode, onClose]);

  return (
    <Portal>
      <div className={cls.EmployeeCardBg}>
        <form ref={refEditCard} className={cls.form} onSubmit={formik.handleSubmit}>
          <div className={cls.userIconContainer}>
            <UserIcon
              userName={employeeData?.name}
              withUpload
              id="userIcon"
              value={formik.values?.userIcon}
              onChange={formik.handleChange}
            />
          </div>
          <div className={cls.inputsWrapper}>
            <Input
              id="name"
              label="Ім'я"
              value={formik.values?.name}
              onChange={formik.handleChange}
            />
            <Input
              id="position"
              label="Посада"
              value={formik.values?.position}
              onChange={formik.handleChange}
            />
          </div>
          <div className={cls.buttonsWrapper}>
            {mode === 'edit' && (
              <Button onClick={formik.handleSubmit}>
                Зберегти
              </Button>
            )}
            {mode === 'create' && (
              <Button onClick={formik.handleSubmit}>
                Створити
              </Button>
            )}
          </div>
        </form>
      </div>
    </Portal>
  );
});

export default EmployeeCard;
