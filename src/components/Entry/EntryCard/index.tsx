'use client';

import React, {
  memo,
} from 'react';
import { useRouter } from 'next/navigation';
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
import { getEmployeeList } from '@components/Employee/selectors/getEmployeeList';
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
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';

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
  data,
  disableFetchTodayEntries = false,
}:EntryEditCardProps) => {
  const { refresh } = useRouter();
  const dispatch = useAppDispatch();
  const { employees, clients } = data;
  const { entry } = useAppSelector(getOpenedEntry);
  const entryDate = dayjs(`${entry?.date} ${entry?.time}`);
  const onSubmitHandler = async (values:IEntry) => {
    const formattedValues = convertObjectToIds<IEntry>(values);
    if (mode === EntryCardMode.EDIT) {
      await dispatch(updateEntry(formattedValues));
      if (!disableFetchTodayEntries) {
        await dispatch(fetchTodayEntries());
      }
      refresh();
      return;
    }
    if (mode === EntryCardMode.CREATE) {
      await dispatch(createEntry(formattedValues));
      if (!disableFetchTodayEntries) {
        await dispatch(fetchTodayEntries());
      }
      refresh();
    }
  };
  const dateTimePickerCallback = (value:dayjs.Dayjs, props:FieldProps) => {
    const time = value.format('HH:mm');
    const date = value.format('YYYY-M-D');
    changeFormikFields(props, { time, date });
  };

  const deleteCurrentEntry = () => {
    if (entry) {
      dispatch(deleteEntry(entry));
    }
  };
  return (
    <Card
      onSubmit={onSubmitHandler}
      initialValues={entry}
      loading={false}
      onClose={onClose}
    >
      {({
        values,
        handleSubmit,
      }) => (
        <>
          <Card.Closer onClick={onClose} />
          {entry && (
            <div className={cls.inputsWrapper}>
              <div className={cls.employee}>
                <Field
                  name="employee"
                >
                  {(props: FieldProps) => (
                    <Select<IEmployee>
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
                    <Select<IClient>
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
                    <Select<IBarberServices>
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
