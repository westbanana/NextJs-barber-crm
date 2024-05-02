'use client';

import React, {
  memo,
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  Field, FieldProps, Formik,
} from 'formik';
import { Trash2, X } from 'lucide-react';
import dayjs from 'dayjs';
import { IClient, IEntries } from '@components/Entry/MiniEntry/entries.type';
import { fetchClientsAndEmployees } from '@components/Entry/services/fetchEntryDates';
import { getClientsAndEmployees } from '@components/Entry/selectors/getClientsAndEmployees';
import { changeFormikField, changeFormikFields } from '@helpers/changeFormikField';
import { updateEntry } from '@components/Entry/services/updateEntry';
import { convertObjectToIds } from '@helpers/convertObjectToIds';
import { getTodayEntries } from '@components/Entry/selectors/getTodayEntries';
import { createEntry } from '@components/Entry/services/createEntry';
import EntryRemover from '@components/Entry/EntryRemover';
import CardBackground from '@components/ui/Card/CardBackground/CardBackground';
import Card from '@components/ui/Card/Card';

import cls from './style.module.scss';

import Portal from '@/components/Portal';
import DateTimePicker from '@/components/DatePicker';
import Button from '@/components/ui/Button/Button';
import Select from '@/components/ui/Select/Select';
import { outsideClick } from '@/helpers/outSideClick';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { getEntriesLoading } from '@/components/Entry/selectors/getEntriesLoading';
import { getOpenedEntry } from '@/components/Entry/selectors/getOpenedEntry';
import { deleteEntry } from '@/components/Entry/services/deleteEntry';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { barberServices, IBarberServices } from '@/constants/barber-services';
import { IEmployee } from '@/components/Employee/EmployeeCard/employee.type';
import { EntryCardMode, EntryEditCardProps } from '@/components/Entry/EntryCard/entry-card.type';
import { SelectItem, SelectMode } from '@/components/ui/Select/select.type';

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
  const loading = useAppSelector(getEntriesLoading);
  const refEditCard = useRef<HTMLFormElement>(null);

  const currentEntryData = useAppSelector(getOpenedEntry);
  const clientsAndEmployees = useAppSelector(getClientsAndEmployees);
  const clients = clientsAndEmployees?.clients ?? [];
  const employees = clientsAndEmployees?.employees ?? [];
  const entryDate = dayjs(`${currentEntryData?.date}${currentEntryData?.time}`);
  const [datePickerOpened, setDatePickerOpened] = useState<boolean>(false);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (!datePickerOpened) {
      outsideClick(e, onClose, refEditCard);
    }
  }, [onClose, datePickerOpened]);

  const onSubmitHandler = (values:IEntries) => {
    const formattedValues = convertObjectToIds<IEntries>(values);
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

  useEffect(() => {
    dispatch(fetchClientsAndEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (mode) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick, mode, onClose]);

  return (
    <Card>
      {!loading && (
        <Formik initialValues={currentEntryData} onSubmit={onSubmitHandler}>
          {({ handleSubmit }) => (
            <form ref={refEditCard} className={cls.form} onSubmit={handleSubmit}>
              <X
                onClick={onClose}
                className={cls.xMark}
              />
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
                          defaultValue={currentEntryData.employee}
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
                          defaultValue={currentEntryData.client}
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
                          defaultValue={currentEntryData.services}
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
                        />
                      )}
                    </Field>
                  </div>
                </div>
              )}
              <div className={cls.buttonsWrapper}>
                {mode === 'edit' && (
                  <>
                    <Button
                      onClick={() => handleSubmit()}
                    >
                      Зберегти
                    </Button>
                    <EntryRemover entry={currentEntryData}>
                      <Button withoutBorder>
                        <Trash2 />
                      </Button>
                    </EntryRemover>
                  </>
                )}
                {mode === 'create' && (
                  <Button
                    onClick={() => handleSubmit()}
                  >
                    Створити
                  </Button>
                )}
              </div>
            </form>
          )}
        </Formik>
      )}
    </Card>
  );
});
export default EntryCard;
