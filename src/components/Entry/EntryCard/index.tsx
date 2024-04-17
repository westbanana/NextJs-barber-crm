'use client';

import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Formik } from 'formik';
import { Trash2, X } from 'lucide-react';
import dayjs from 'dayjs';

import Portal from '@/components/Portal';
import { outsideClick } from '@/helpers/outSideClick';
import Button from '@/components/ui/Button/Button';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { createEmployee } from '@/components/EmployeeCard/services/createEmployee';
import { updateEmployee } from '@/components/EmployeeCard/services/updateEmployee';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { EmployeeSchema } from '@/components/EmployeeCard/validation';
import { IEmployee } from '@/components/EmployeeCard/employee.type';
import DateTimePicker from '@/components/DatePicker';
import { EntryCardMode, EntryEditCardProps } from '@/components/Entry/EntryCard/entry-card.type';
import { getEntriesLoading } from '@/components/Entry/selectors/getEntriesLoading';
import CardBackground from '@/components/ui/CardBackground/CardBackground';
import { getOpenedEntry } from '@/components/Entry/selectors/getOpenedEntry';
import { deleteEntry } from '@/components/Entry/services/deleteEntry';
import Select from '@/components/ui/Select/Select';
import { getAllClients } from '@/components/Entry/services/getClients';
import { getAllEmployees } from '@/components/Entry/services/getEmployees';
import { barberServices, IBarberServices } from '@/constants/barber-services';
import { IClient } from '@/components/Entry/entries.type';
import { SelectMode } from '@/components/ui/Select/select.type';

import cls from './style.module.scss';

export type TSelectsData = {
  clients: IClient[];
  employees: IEmployee[];
  services: IBarberServices[];
}

const EntryCard = ({
  onClose,
  mode,
  entryDates,
}:EntryEditCardProps) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(getEntriesLoading);
  const currentEntryData = useAppSelector(getOpenedEntry);
  const entryDate = dayjs(`${currentEntryData?.date}${currentEntryData?.time}`);
  const [selectsData, setSelectsData] = useState<TSelectsData>();
  const refEditCard = useRef<HTMLFormElement>(null);
  const onSubmitFormik = (values:IEmployee) => {
    if (mode === EntryCardMode.EDIT) {
      dispatch(updateEmployee(values));
    }
    if (mode === EntryCardMode.CREATE) {
      dispatch(createEmployee(values));
    }
  };

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    outsideClick(e, onClose, refEditCard);
  }, [onClose]);

  const getSelectsData = async () => {
    try {
      const clients = await getAllClients();
      const employees = await getAllEmployees();
      const services = barberServices;
      setSelectsData({
        clients,
        employees,
        services,
      });
      return {
        clients,
        employees,
        services,
      };
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getSelectsData();
  }, []);

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

  return (
    <Portal>
      <CardBackground>
        <Formik initialValues={currentEntryData} onSubmit={onSubmitFormik} validationSchema={EmployeeSchema}>
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
                  <Select data={selectsData?.employees!!} label="employee" defaultValue={[]} />
                </div>
                <div className={cls.client}>
                  <Select data={selectsData?.clients!!} label="client" defaultValue={[]} />
                </div>
                <div className={cls.services}>
                  <Select
                    data={selectsData?.services!!}
                    label="services"
                    defaultValue={[]}
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
      </CardBackground>
    </Portal>
  );
};
export default EntryCard;
