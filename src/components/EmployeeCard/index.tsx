'use client';

import React, {
  memo, useEffect, useMemo, useRef,
} from 'react';
import { Formik } from 'formik';
import { Trash2, X } from 'lucide-react';

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
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { getEmployeeLoading } from '@/components/EmployeeList/selectors/getEmployeeLoading';
import { deleteEmployee } from '@/components/EmployeeList/services/deleteEmployee';
import { EmployeeSchema } from '@/components/EmployeeCard/validation';
import TimePicker from '@/components/testPicker/TimePicker';

import cls from './style.module.scss';

const EmployeeCard = memo(({
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

  const deleteCurrentEmployee = () => {
    dispatch(deleteEmployee(employeeData));
  };

  return (
    <Portal>
      <div className={cls.EmployeeCardBg}>
        <Formik initialValues={employeeData} onSubmit={onSubmitFormik} validationSchema={EmployeeSchema}>
          {({
            handleSubmit,
            values,
            handleChange,
            errors,
            touched,
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
                    <TimePicker label="З" />
                    <TimePicker label="По" />
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
});

export default EmployeeCard;
