'use client';

import React, {
  memo, useState,
} from 'react';
import { Trash2 } from 'lucide-react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { Controller, UseFormSetValue } from 'react-hook-form';

import Card from '@components/ui/Card/Card';
import Select from '@/components/ui/Select/Select';
import DateTimePicker from '@/components/DatePicker';
import { IClient, IEntry } from '@components/Entry/MiniEntry/entries.type';
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
import { SelectMode } from '@/components/ui/Select/select.type';
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';
import Form from '@components/Form';

import cls from './style.module.scss';

const EntryCard = memo(({
  mode,
  onClose,
  data,
  disableFetchTodayEntries = false,
}:EntryEditCardProps) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { employees, clients } = data;
  const { entry } = useAppSelector(getOpenedEntry);
  const [isDatePickerOpened, setIsDatePickerOpened] = useState<boolean>(false);
  const entryDate = entry?.date ? dayjs(`${entry?.date} ${entry?.time}`) : undefined;
  const onSubmitHandler = async (values:IEntry) => {
    const formattedValues = convertObjectToIds<IEntry>(values);
    if (mode === EntryCardMode.EDIT) {
      await dispatch(updateEntry(formattedValues));
      if (!disableFetchTodayEntries) {
        await dispatch(fetchTodayEntries());
      }
      return;
    }
    if (mode === EntryCardMode.CREATE) {
      await dispatch(createEntry(formattedValues));
      if (!disableFetchTodayEntries) {
        await dispatch(fetchTodayEntries());
      }
    }
  };
  const dateTimePickerCallback = (value:dayjs.Dayjs, setValue: UseFormSetValue<IEntry>) => {
    const time = value.format('HH:mm');
    const date = value.format('YYYY-M-D');
    setValue('time', time);
    setValue('date', date);
  };

  const deleteCurrentEntry = () => {
    if (entry) {
      dispatch(deleteEntry(entry));
    }
  };
  return (
    <Card<HTMLFormElement>
      onClose={onClose}
      disabledOutsideClick={isDatePickerOpened}
    >
      <Form<IEntry> initialState={entry!!}>
        {({
          errors,
          control,
          handleSubmit,
          setValue,
        }) => (
          <>
            <Card.Closer onClick={onClose} />
            {entry && (
              <div className={cls.inputsWrapper}>
                <div className={cls.employee}>
                  <Controller
                    name="employee"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select<IEmployee>
                        error={errors.employee?.type}
                        data={employees}
                        label={t('entry-card.inputs.employee')}
                        disabled={mode === EntryCardMode.READ_ONLY}
                        defaultValue={[(field.value as IEmployee)]}
                        callback={(value) => {
                          field.onChange(value[0]);
                        }}
                      />
                    )}
                  />
                </div>
                <div className={cls.client}>
                  <Controller
                    name="client"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select<IClient>
                        error={errors.client?.type}
                        data={clients}
                        label={t('entry-card.inputs.clients')}
                        defaultValue={[field.value as IClient]}
                        disabled={mode === EntryCardMode.READ_ONLY}
                        callback={(value) => {
                          field.onChange(value[0]);
                        }}
                      />
                    )}
                  />
                </div>
                <div className={cls.services}>
                  <Controller
                    name="services"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select<IBarberServices>
                        error={errors.services?.type}
                        data={barberServices}
                        label={t('entry-card.inputs.services')}
                        disabled={mode === EntryCardMode.READ_ONLY}
                        defaultValue={field.value as IBarberServices[]}
                        callback={field.onChange}
                        selectMode={SelectMode.MULTISELECT}
                      />
                    )}
                  />
                </div>
                <div className={cls.date}>
                  <Controller
                    name="date"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={() => (
                      <DateTimePicker
                        error={errors.date?.type}
                        label="Date"
                        callback={(value) => dateTimePickerCallback(value, setValue)}
                        defaultValue={entryDate}
                        disabled={mode === EntryCardMode.READ_ONLY}
                        setIsOpened={setIsDatePickerOpened}
                      />
                    )}
                  />
                </div>
              </div>
            )}
            <div className={cls.buttonsWrapper}>
              {mode === 'edit' && (
                <>
                  <Card.Button
                    onClick={handleSubmit(onSubmitHandler)}
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
                  onClick={handleSubmit(onSubmitHandler)}
                >
                  {t('entry-card.create')}
                </Card.Button>
              )}
            </div>

          </>

        )}
      </Form>
    </Card>
  );
});
export default EntryCard;
