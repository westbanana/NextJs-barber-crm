'use client';

import React, { memo, useEffect, useRef } from 'react';
import { Upload } from 'lucide-react';
import { useFormik } from 'formik';

import Portal from '@/components/Portal';
import { EmployeeEditCardProps } from '@/components/EmployeeCard/employee-card.type';
import { outsideClick } from '@/helpers/outSideClick';
import { IEmployee } from '@/components/EmployeeList/EmployeeItem/employee.type';
import Input from '@/components/ui/Input/Input';
import UserIcon from '@/components/ui/UserIcon/UserIcon';
import Button from '@/components/ui/Button/Button';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { updateEmployee } from '@/components/EmployeeList/slices/employeeListSlice';

import cls from './style.module.scss';

const EmployeeCard = memo(({
  employeeData = {} as IEmployee,
  isOpened,
  onClose,
  mode,
}:EmployeeEditCardProps) => {
  const dispatch = useAppDispatch();
  const refEditCard = useRef<HTMLDivElement>(null);

  const formik = useFormik({
    initialValues: employeeData,
    onSubmit: (values:IEmployee) => {
      dispatch(updateEmployee(values));
    },
  });

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('click', (e) => {
        outsideClick(e, onClose, refEditCard);
      });
    }
    return () => {
      document.removeEventListener('click', () => null);
    };
  }, [isOpened, onClose]);

  return (
    <Portal>
      <div className={cls.EmployeeCardBg}>
        <div
          ref={refEditCard}
          className={cls.EmployeeCard}
        >
          <form onSubmit={formik.handleSubmit}>
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
                <Button onClick={formik.submitForm}>
                  Створити
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
});

export default EmployeeCard;
