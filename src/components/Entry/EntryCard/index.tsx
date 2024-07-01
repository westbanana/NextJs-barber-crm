'use client';

import React, {
  memo, useState,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  Field, FieldProps,
} from 'formik';
import { Trash2 } from 'lucide-react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import Card from '@components/ui/Card/Card';
import Select from '@/components/ui/Select/Select';
import DateTimePicker from '@/components/DatePicker';
import { IClient, IEntry } from '@components/Entry/MiniEntry/entries.type';
import { changeFormikField, changeFormikFields } from '@helpers/changeFormikField';
import { updateEntry } from '@components/Entry/services/updateEntry';
import { convertObjectToIds } from '@helpers/convertObjectToIds';
import { createEntry } from '@components/Entry/services/createEntry';
import { deleteEntry } from '@components/Entry/services/deleteEntry';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { getOpenedEntry } from '@/components/Entry/selectors/getOpenedEntry';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { barberServices, IBarberServices } from '@/constants/barber-services';
import { IEmployee } from '@/components/Employee/EmployeeCard/employee.type';
import { EntryCardMode, EntryEditCardProps } from '@/components/Entry/EntryCard/entry-card.type';
import { SelectItem, SelectMode } from '@/components/ui/Select/select.type';
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';

import cls from './style.module.scss';

const EntryCard = memo(({
  entryDates,
  mode,
  onClose,
  data,
  disableFetchTodayEntries = false,
}:EntryEditCardProps) => {
  const t = useTranslations();
  const { refresh } = useRouter();
  const dispatch = useAppDispatch();
  const { employees, clients } = data;
  const { entry } = useAppSelector(getOpenedEntry);
  const [isDatePickerOpened, setIsDatePickerOpened] = useState<boolean>(false);
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
      disabledOutsideClick={isDatePickerOpened}
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
                      label={t('entry-card.inputs.employee')}
                      disabled={mode === EntryCardMode.READ_ONLY}
                      defaultValue={[values.employee]}
                      callback={(value) => {
                        changeFormikField<SelectItem>(value[0], props.field);
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
                      label={t('entry-card.inputs.clients')}
                      defaultValue={[values.client]}
                      disabled={mode === EntryCardMode.READ_ONLY}
                      callback={(value) => {
                        changeFormikField<SelectItem>(value[0], props.field);
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
                      label={t('entry-card.inputs.services')}
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
                      // callback={(value) => dateTimePickerCallback(value, props)}
                      callback={(value) => console.log(value)}
                      dates={entryDates}
                      defaultValue={entryDate}
                      disabled={mode === EntryCardMode.READ_ONLY}
                      setIsOpened={setIsDatePickerOpened}
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
                  {t('entry-card.save')}
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
                {t('entry-card.create')}
              </Card.Button>
            )}
          </div>

        </>
      )}
    </Card>
  );
});
export default EntryCard;
