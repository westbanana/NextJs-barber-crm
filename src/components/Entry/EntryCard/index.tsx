'use client';

import React, {
  memo,
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Formik } from 'formik';
import { Trash2, X } from 'lucide-react';
import dayjs from 'dayjs';
import { EntryInfo } from '@components/Entry/Info/info.type';
import { getAllEmployees, getEmployees } from '@components/Entry/services/getEmployees';
import { getAllClients, getClients } from '@components/Entry/services/getClients';
import { IClient } from '@components/Entry/MiniEntry/entries.type';
import { getSelectsData } from '@components/Entry/services/getSelectsData';
import { fetchClientsAndEmployees } from '@components/Entry/services/fetchEntriesDates';
import { getClientsAndEmployees } from '@components/Entry/selectors/getClientsAndEmployees';

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
import { EntryEditCardProps } from '@/components/Entry/EntryCard/entry-card.type';
import { SelectMode } from '@/components/ui/Select/select.type';

import cls from './style.module.scss';

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

  const onSumbitHandler = (values:any) => {
    console.log(values);
  };
  console.log({ currentEntryData });
  return (
    <Portal>
      <CardBackground>
        {!loading && (
          <Formik initialValues={currentEntryData} onSubmit={onSumbitHandler}>
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
                <div className={cls.inputsWrapper}>
                  <div className={cls.employee}>
                    <Select data={employees} label="employee" defaultValue={[currentEntryData.employee]} />
                  </div>
                  <div className={cls.client}>
                    <Select data={clients} label="client" defaultValue={[currentEntryData.client]} />
                  </div>
                  <div className={cls.services}>
                    <Select
                      data={[]}
                      label="services"
                      defaultValue={currentEntryData.services}
                      selectMode={SelectMode.MULTISELECT}
                    />
                  </div>
                  <div className={cls.date}>
                    <DateTimePicker dates={entryDates} defaultValue={entryDate} />
                  </div>
                </div>
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
