'use client';

import React, {
  memo,
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  Field, FieldInputProps, FieldProps, Formik,
} from 'formik';
import { Trash2, X } from 'lucide-react';
import dayjs from 'dayjs';
import { EntryInfo } from '@components/Entry/Info/info.type';
import { getAllEmployees, getEmployees } from '@components/Entry/services/getEmployees';
import { getAllClients, getClients } from '@components/Entry/services/getClients';
import { IClient, IEntries } from '@components/Entry/MiniEntry/entries.type';
import { getSelectsData } from '@components/Entry/services/getSelectsData';
import { fetchClientsAndEmployees } from '@components/Entry/services/fetchEntriesDates';
import { getClientsAndEmployees } from '@components/Entry/selectors/getClientsAndEmployees';
import { days } from '@constants/days';
import { changeFormikField } from '@helpers/changeFormikField';
import { EmployeeCardMode } from '@components/Employee/EmployeeCard/employee-card.type';
import { updateEmployee } from '@components/Employee/EmployeeCard/services/updateEmployee';
import { createEmployee } from '@components/Employee/EmployeeCard/services/createEmployee';
import { updateEntry } from '@components/Entry/services/updateEntry';
import { convertObjectToIds } from '@helpers/convertObjectToIds';
import { fetchEntries } from '@components/Entry/services/fetchEntries';
import { getEntryList } from '@components/Entry/selectors/getEntryList';

import cls from './style.module.scss';

import Portal from '@/components/Portal';
import DateTimePicker from '@/components/DatePicker';
import Button from '@/components/ui/Button/Button';
import CardBackground from '@/components/ui/CardBackground/CardBackground';
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
  onClose,
  mode,
  entryDates,
}:EntryEditCardProps) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(getEntriesLoading);
  const entriesList = useAppSelector(getEntryList);
  const currentEntryData = useAppSelector(getOpenedEntry);
  const clientsAndEmployees = useAppSelector(getClientsAndEmployees);
  const clients = clientsAndEmployees?.clients ?? [];
  const employees = clientsAndEmployees?.employees ?? [];
  const entryDate = dayjs(`${currentEntryData?.date}${currentEntryData?.time}`);
  const [selectsData, setSelectsData] = useState<TSelectsData>();
  const refEditCard = useRef<HTMLFormElement>(null);
  const [entryCardLoading, setEntryCardLoading] = useState<boolean>(loading);

  useEffect(() => {
    dispatch(fetchClientsAndEmployees());
  }, [dispatch]);

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

  const deleteCurrentEntry = () => {
    if (currentEntryData) {
      dispatch(deleteEntry(currentEntryData));
    }
  };

  const onSumbitHandler = (values:IEntries) => {
    if (mode === EntryCardMode.EDIT) {
      const formattedValues = convertObjectToIds<IEntries>(values);
      dispatch(updateEntry(formattedValues));
    }
    if (mode === EntryCardMode.CREATE) {
      console.log('create');
    }
  };
  console.log(entriesList);
  return (
    <Portal>
      <CardBackground>
        {!loading && (
          <Formik initialValues={currentEntryData} onSubmit={onSumbitHandler}>
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
                      <DateTimePicker dates={entryDates} defaultValue={entryDate} />
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
                      <Button withoutBorder onClick={deleteCurrentEntry}>
                        <Trash2 />
                      </Button>
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
      </CardBackground>
    </Portal>
  );
});
export default EntryCard;
