'use client';

import React, {
  useCallback,
  useEffect, useRef,
} from 'react';
import {
  Field, FieldInputProps, FieldProps, Formik,
} from 'formik';
import { Trash2, X } from 'lucide-react';

import Portal from '@/components/Portal';
import { EmployeeCardMode, EmployeeEditCardProps } from '@/components/EmployeeCard/employee-card.type';
import { outsideClick } from '@/helpers/outSideClick';
import Input from '@/components/ui/Input/Input';
import UserIcon from '@/components/ui/UserIcon/UserIcon';
import Button from '@/components/ui/Button/Button';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { createEmployee } from '@/components/EmployeeCard/services/createEmployee';
import { updateEmployee } from '@/components/EmployeeCard/services/updateEmployee';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { getEmployeeLoading } from '@/components/EmployeeCard/selectors/getEmployeeLoading';
import { EmployeeSchema } from '@/components/EmployeeCard/validation';
import TimeInput from '@/components/testPicker/TimeInput';
import { deleteEmployee } from '@/components/EmployeeCard/services/deleteEmployee';
import { IEmployee } from '@/components/EmployeeCard/employee.type';
import { days } from '@/constants/days';
import Select from '@/components/ui/Select/Select';
import { newEmployee } from '@/constants/employee';

import cls from './style.module.scss';

const EmployeeCard = ({
  employeeData = newEmployee,
  onClose,
  mode,
}:EmployeeEditCardProps) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(getEmployeeLoading);
  const refEditCard = useRef<HTMLFormElement>(null);
  const onSubmitFormik = (values:IEmployee) => {
    if (mode === EmployeeCardMode.EDIT) {
      dispatch(updateEmployee(values));
    }
    if (mode === EmployeeCardMode.CREATE) {
      dispatch(createEmployee(values));
    }
  };

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    outsideClick(e, onClose, refEditCard);
  }, [onClose]);

  useEffect(() => {
    if (mode) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick, mode, onClose]);

  const deleteCurrentEmployee = () => {
    dispatch(deleteEmployee(employeeData));
  };

  const changeField = (newValue: string, field: FieldInputProps<any>) => {
    const { name, onChange } = field;
    onChange({
      target: {
        name,
        value: newValue,
      },
    });
  };

  return (
    <Portal>
      <div className={cls.EntryCardBg}>
        <Formik initialValues={employeeData} onSubmit={onSubmitFormik} validationSchema={EmployeeSchema}>
          {({
            handleSubmit,
            values,
            handleChange,
          }) => (
            <form ref={refEditCard} className={cls.form} onSubmit={handleSubmit}>
              <X
                onClick={onClose}
                className={cls.xMark}
              />
              client: client
              employee: employee
              date: date
              services
              <div className={cls.buttonsWrapper}>
                {mode === 'edit' && (
                  <>
                    <Button
                      onClick={() => handleSubmit()}
                      loading={loading}
                    >
                      Зберегти
                    </Button>
                    <Button withoutBorder onClick={deleteCurrentEmployee}>
                      <Trash2 />
                    </Button>
                  </>
                )}
                {mode === 'create' && (
                  <Button
                    onClick={() => handleSubmit()}
                    loading={loading}
                  >
                    Створити
                  </Button>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Portal>
  );
};
export default EmployeeCard;
