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

import cls from './style.module.scss';

const EmployeeCard = ({
  employeeData = {} as IEmployee,
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
    outsideClick(e, onClose, refEditCard, 'EmployeeCard');
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
      <div className={cls.EmployeeCardBg}>
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
              <div className={cls.userIconContainer}>
                <UserIcon
                  userName={employeeData?.name}
                  withUpload
                  id="userIcon"
                  value={values?.userIcon}
                  onChange={handleChange}
                />
              </div>
              <div className={cls.inputsWrapper}>
                <Input
                  id="name"
                  label="Ім'я"
                  value={values?.name}
                  onChange={handleChange}
                />
                <Input
                  id="position"
                  label="Посада"
                  value={values?.position}
                  onChange={handleChange}
                />
                <div className={cls.workScheduleTime}>
                  Час роботи
                  <div className={cls.timeSelector}>
                    <Field
                      name="work_schedule.time.from"
                      render={(props: FieldProps) => (
                        <TimeInput
                          callback={(value) => {
                            changeField(value, props.field);
                          }}
                          time={values?.work_schedule?.time.from}
                        />

                      )}
                    />
                    <Field
                      name="work_schedule.time.to"
                      render={(props: FieldProps) => (
                        <TimeInput
                          callback={(value) => {
                            changeField(value, props.field);
                          }}
                          time={values?.work_schedule?.time.to}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className={cls.buttonsWrapper}>
                {mode === 'edit' && (
                  <>
                    <Button
                      onClick={() => handleSubmit()}
                      loading={loading}
                    >
                      Зберегти
                    </Button>
                    <Button onClick={deleteCurrentEmployee}>
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
