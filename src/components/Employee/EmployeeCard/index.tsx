'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import { SelectMode } from '@components/ui/Select/select.type';
import Card from '@components/ui/Card/Card';
import { deleteEmployee } from '@components/Employee/services/deleteEmployee';
import Input from '@/components/ui/Input/Input';
import UserIcon from '@/components/ui/UserIcon/UserIcon';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { days, DayType } from '@/constants/days';
import Select from '@/components/ui/Select/Select';
import { newEmployee } from '@/constants/employee';
import { IEmployee } from '@/components/Employee/EmployeeCard/employee.type';
import { getEmployeeLoading } from '@components/Employee/selectors/getEmployeeLoading';
import { EmployeeCardMode, EmployeeEditCardProps } from '@/components/Employee/EmployeeCard/employee-card.type';
import Form from '@components/Form';
import { updateEmployee } from '@components/Employee/services/updateEmployee';
import { createEmployee } from '@components/Employee/services/createEmployee';

import cls from './style.module.scss';

import TimeInput from '../../ui/TimeInput';

const EmployeeCard = ({
  employeeData = newEmployee,
  mode,
  onClose,
}:EmployeeEditCardProps) => {
  const t = useTranslations();
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
    <Card<HTMLFormElement> onClose={onClose}>
      <Form<IEmployee> initialState={employeeData}>
        {({
          errors, control, handleSubmit,
        }) => (
          <>
            <Card.Closer />
            <div className={cls.userIconContainer}>
              <Controller
                name="userIcon"
                control={control}
                render={({ field }) => (
                  <UserIcon
                    userName={employeeData?.name}
                    withUpload
                    id="userIcon"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className={cls.inputsWrapper}>
              <div className={cls.nameInputs}>
                <Controller
                  name="name"
                  rules={{
                    minLength: 5,
                    maxLength: 20,
                    required: true,
                  }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="name"
                      error={errors.name?.type}
                      label={t('employee-page.employee-card.name')}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  name="position"
                  control={control}
                  rules={{
                    minLength: 5,
                    maxLength: 20,
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input
                      error={errors.position?.type}
                      id="position"
                      label={t('employee-page.employee-card.position')}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className={cls.dateInputs}>
                <div className={cls.workScheduleTime}>
                  {t('employee-page.employee-card.time')}
                  <div className={cls.timeSelector}>
                    <Controller
                      name="work_schedule.time.from"
                      control={control}
                      render={({ field }) => (
                        <TimeInput
                          callback={field.onChange}
                          label={t('employee-page.employee-card.from')}
                          time={field.value}
                        />
                      )}
                    />
                    <Controller
                      name="work_schedule.time.to"
                      control={control}
                      render={({ field }) => (
                        <TimeInput
                          callback={field.onChange}
                          label={t('employee-page.employee-card.to')}
                          time={field.value}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className={cls.workScheduleTime}>
                  {t('employee-page.employee-card.days')}
                  <div className={cls.timeSelector}>
                    <Controller
                      name="work_schedule.days.from"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select<DayType>
                          error={errors.work_schedule?.days?.from?.type}
                          callback={(value) => field.onChange(value[0].name)}
                          defaultValue={[{
                            name: field.value,
                            id: field.value,
                          }]}
                          className={cls.DataSelect}
                          label={t('employee-page.employee-card.from')}
                          data={days}
                          selectMode={SelectMode.SINGLESELECT}
                        />
                      )}
                    />
                    <Controller
                      name="work_schedule.days.to"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select<DayType>
                          error={errors.work_schedule?.days?.to?.type}
                          defaultValue={[{
                            name: field.value,
                            id: field.value,
                          }]}
                          callback={(value) => field.onChange(value[0].name)}
                          className={cls.DataSelect}
                          selectMode={SelectMode.SINGLESELECT}
                          label={t('employee-page.employee-card.to')}
                          data={days}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={cls.buttonsWrapper}>
              {mode === 'edit' && (
                <>
                  <Card.Button
                    onClick={handleSubmit(onSubmitFormik)}
                    loading={loading}
                  >
                    {t('employee-page.employee-card.save')}
                  </Card.Button>
                  <Card.Button onClick={deleteCurrentEmployee}>
                    <Trash2 />
                  </Card.Button>
                </>
              )}
              {mode === 'create' && (
                <Card.Button
                  onClick={handleSubmit(onSubmitFormik)}
                  loading={loading}
                >
                  {t('employee-page.employee-card.create')}
                </Card.Button>
              )}
            </div>
          </>
        )}
      </Form>
    </Card>
  );
};
export default EmployeeCard;
