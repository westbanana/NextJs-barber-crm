'use client';

import React from 'react';
import { Field, FieldProps } from 'formik';
import { Trash2, X } from 'lucide-react';
import { SelectItem, SelectMode } from '@components/ui/Select/select.type';
import { changeFormikField } from '@helpers/changeFormikField';
import Card from '@components/ui/Card/Card';
import { deleteEmployee } from '@components/Employee/EmployeeCard/services/deleteEmployee';

import cls from './style.module.scss';

import Input from '@/components/ui/Input/Input';
import UserIcon from '@/components/ui/UserIcon/UserIcon';
import Button from '@/components/ui/Button/Button';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import TimeInput from '@/components/testPicker/TimeInput';
import { days } from '@/constants/days';
import Select from '@/components/ui/Select/Select';
import { newEmployee } from '@/constants/employee';
import { IEmployee } from '@/components/Employee/EmployeeCard/employee.type';
import { EmployeeSchema } from '@/components/Employee/EmployeeCard/validation';
import { getEmployeeLoading } from '@/components/Employee/EmployeeCard/selectors/getEmployeeLoading';
import { updateEmployee } from '@/components/Employee/EmployeeCard/services/updateEmployee';
import { createEmployee } from '@/components/Employee/EmployeeCard/services/createEmployee';
import { EmployeeCardMode, EmployeeEditCardProps } from '@/components/Employee/EmployeeCard/employee-card.type';

const EmployeeCard = ({
  employeeData = newEmployee,
  mode,
  onClose,
}:EmployeeEditCardProps) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(getEmployeeLoading);
  const onSubmitFormik = (values:IEmployee) => {
    if (mode === EmployeeCardMode.EDIT) {
      dispatch(updateEmployee(values));
    }
    if (mode === EmployeeCardMode.CREATE) {
      dispatch(createEmployee(values));
    }
  };

  const deleteCurrentEmployee = () => {
    if (employeeData) {
      dispatch(deleteEmployee(employeeData));
    }
  };

  return (
    <Card
      validationSchema={EmployeeSchema}
      initialValues={employeeData}
      onSubmit={onSubmitFormik}
      onClose={onClose}
    >
      {({
        values,
        handleChange,
        handleSubmit,
      }) => (
        <>
          <Card.Closer />
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
                          changeFormikField<string>([value], props.field);
                        }}
                        time={values?.work_schedule?.time.from}
                      />

                    )}
                  </Field>
                  <Field
                    name="work_schedule.time.to"
                  >
                    {(props: FieldProps) => (
                      <TimeInput
                        callback={(value) => {
                          changeFormikField<string>([value], props.field);
                        }}
                        time={values?.work_schedule?.time.to}
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
                          changeFormikField<SelectItem>(value, props.field);
                        }}
                        defaultValue={values?.work_schedule?.days?.from}
                        className={cls.DataSelect}
                        label="From"
                        data={days}
                        selectMode={SelectMode.SINGLESELECT}
                      />
                    )}
                  </Field>
                  <Field
                    name="work_schedule.days.to"
                  >
                    {(props: FieldProps) => (
                      <Select
                        defaultValue={values?.work_schedule?.days?.to}
                        callback={(value) => {
                          changeFormikField<SelectItem>(value, props.field);
                        }}
                        className={cls.DataSelect}
                        selectMode={SelectMode.SINGLESELECT}
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
                <Card.Button onClick={handleSubmit} loading={loading}>
                  Зберегти
                </Card.Button>
                <Card.Button onClick={deleteCurrentEmployee}>
                  <Trash2 />
                </Card.Button>
              </>
            )}
            {mode === 'create' && (
              <Card.Button
                onClick={handleSubmit}
                loading={loading}
              >
                Створити
              </Card.Button>
            )}
          </div>
        </>
      )}
    </Card>
  );
};
export default EmployeeCard;
