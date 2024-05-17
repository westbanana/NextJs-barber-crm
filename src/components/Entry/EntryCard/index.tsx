'use client';

import React, {
  memo, useState,
} from 'react';
import {
  Field, FieldProps,
} from 'formik';
import { Trash2 } from 'lucide-react';
import dayjs from 'dayjs';

import { IClient, IEntry } from '@components/Entry/MiniEntry/entries.type';
import { changeFormikField, changeFormikFields } from '@helpers/changeFormikField';
import { updateEntry } from '@components/Entry/services/updateEntry';
import { convertObjectToIds } from '@helpers/convertObjectToIds';
import { createEntry } from '@components/Entry/services/createEntry';
import Card from '@components/ui/Card/Card';
import { deleteEntry } from '@components/Entry/services/deleteEntry';
import { getEmployeeList } from '@components/Employee/EmployeeList/selectors/getEmployeeList';
import { getClientList } from '@components/Client/selectors/getClientList';
import DateTimePicker from '@/components/DatePicker';
import Select from '@/components/ui/Select/Select';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { getOpenedEntry } from '@/components/Entry/selectors/getOpenedEntry';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { barberServices, IBarberServices } from '@/constants/barber-services';
import { IEmployee } from '@/components/Employee/EmployeeCard/employee.type';
import { EntryCardMode, EntryEditCardProps } from '@/components/Entry/EntryCard/entry-card.type';
import { SelectItem, SelectMode } from '@/components/ui/Select/select.type';

import cls from './style.module.scss';

export type TSelectsData = {
  clients: IClient[];
  employees: IEmployee[];
  services: IBarberServices[];
}

const EntryCard = memo(({
  entryDates,
  mode,
  onClose,
}:EntryEditCardProps) => {
  const dispatch = useAppDispatch();
  const currentEntryData = useAppSelector(getOpenedEntry);
  const employees = useAppSelector(getEmployeeList);
  const clients = useAppSelector(getClientList);
  const entryDate = dayjs(`${currentEntryData?.date} ${currentEntryData?.time}`);
  const [datePickerOpened, setDatePickerOpened] = useState<boolean>(false);
  const onSubmitHandler = (values:IEntry) => {
    const formattedValues = convertObjectToIds<IEntry>(values);
    if (mode === EntryCardMode.EDIT) {
      dispatch(updateEntry(formattedValues));
    }
    if (mode === EntryCardMode.CREATE) {
      dispatch(createEntry(formattedValues));
    }
  };
  const dateTimePickerCallback = (value:dayjs.Dayjs, props:FieldProps) => {
    const time = value.format('HH:mm');
    const date = value.format('YYYY-M-D');
    changeFormikFields(props, { time, date });
  };

  const deleteCurrentEntry = () => {
    if (currentEntryData) {
      dispatch(deleteEntry(currentEntryData));
    }
  };
  return (
    <Card
      onSubmit={onSubmitHandler}
      initialValues={currentEntryData}
      loading={false}
      onClose={onClose}
      outsideClickCondition={!datePickerOpened}
    >
      {({
        values,
        handleSubmit,
      }) => (
        <>
          <Card.Closer onClick={onClose} />
          {currentEntryData && (
            <div className={cls.inputsWrapper}>
              <div className={cls.employee}>
                <Field
                  name="employee"
                >
                  {(props: FieldProps) => (
                    <Select
                      data={employees}
                      label="employee"
                      disabled={mode === EntryCardMode.READ_ONLY}
                      defaultValue={values.employee}
                      callback={(value) => {
                        changeFormikField<SelectItem>(value, props.field);
                      }}
                    />
                  )}
                </Field>
              </div>
              <div className={cls.client}>
                <Field name="client">
                  {(props: FieldProps) => (
                    <Select
                      data={clients}
                      label="client"
                      defaultValue={values.client}
                      disabled={mode === EntryCardMode.READ_ONLY}
                      callback={(value) => {
                        changeFormikField<SelectItem>(value, props.field);
                      }}
                    />
                  )}
                </Field>
              </div>
              <div className={cls.services}>
                <Field name="services">
                  {(props: FieldProps) => (
                    <Select
                      data={barberServices}
                      label="services"
                      disabled={mode === EntryCardMode.READ_ONLY}
                      defaultValue={values.services}
                      callback={(value) => {
                        changeFormikField<SelectItem>(value, props.field);
                      }}
                      selectMode={SelectMode.MULTISELECT}
                    />
                  )}
                </Field>
              </div>
              <div className={cls.date}>
                <Field>
                  {(props: FieldProps) => (
                    <DateTimePicker
                      callback={(value) => dateTimePickerCallback(value, props)}
                      dates={entryDates}
                      defaultValue={entryDate}
                      setOpened={setDatePickerOpened}
                      disabled={mode === EntryCardMode.READ_ONLY}
                    />
                  )}
                </Field>
              </div>
            </div>
          )}
          <div className={cls.buttonsWrapper}>
            {mode === 'edit' && (
              <>
                <Card.Button
                  onClick={handleSubmit}
                >
                  Зберегти
                </Card.Button>
                <Card.Button
                  onClick={deleteCurrentEntry}
                >
                  <Trash2 />
                </Card.Button>
              </>
            )}
            {mode === 'create' && (
              <Card.Button
                onClick={handleSubmit}
              >
                Створити
              </Card.Button>
            )}
          </div>

        </>
      )}
    </Card>
  );
});
export default EntryCard;
