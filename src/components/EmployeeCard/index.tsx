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
                <div className={cls.nameInputs}>
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
                </div>
                <div className={cls.dateInputs}>
                  <div className={cls.workScheduleTime}>
                    Час роботи
                    <div className={cls.timeSelector}>
                      <Field
                        name="work_schedule.time.from"
                      >
                        {(props: FieldProps) => (
                          <TimeInput
                            callback={(value) => {
                              changeField(value, props.field);
                            }}
                            time={employeeData?.work_schedule?.time.from}
                          />

                        )}
                      </Field>
                      <Field
                        name="work_schedule.time.to"
                      >
                        {(props: FieldProps) => (
                          <TimeInput
                            callback={(value) => {
                              changeField(value, props.field);
                            }}
                            time={employeeData?.work_schedule?.time.to}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className={cls.workScheduleTime}>
                    Дні роботи
                    <div className={cls.timeSelector}>
                      <Field
                        name="work_schedule.days.from"
                      >
                        {(props: FieldProps) => (
                          <Select
                            callback={(value) => {
                              changeField(value, props.field);
                            }}
                            defaultValue={employeeData?.work_schedule?.days?.from}
                            className={cls.DataSelect}
                            label="From"
                            data={days}
                          />
                        )}
                      </Field>
                      <Field
                        name="work_schedule.days.to"
                      >
                        {(props: FieldProps) => (
                          <Select
                            defaultValue={employeeData?.work_schedule?.days?.to}
                            callback={(value) => {
                              changeField(value, props.field);
                            }}
                            className={cls.DataSelect}
                            label="To"
                            data={days}
                          />
                        )}
                      </Field>
                    </div>
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
