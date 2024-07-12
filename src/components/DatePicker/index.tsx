'use client';

import React, { useCallback, useState } from 'react';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ukUA, enUS, ruRU } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useLocale } from 'next-intl';

import Label from '@components/ui/Label/Label';
import { FormFieldErrors } from '@constants/formFieldErrors';

import cls from './style.module.scss';

export type DateTimePickerProps = {
  defaultValue?: dayjs.Dayjs | undefined | null
  callback: (value:dayjs.Dayjs) => void
  disabled?: boolean
  setIsOpened: (state: boolean) => void
  label: string
  error?: string
}

type localeTextType = {
  components: {
    MuiLocalizationProvider: {
      defaultProps: {
        localeText: {
          previousMonth?: string | undefined
        }
        nextMonth?: string | undefined
        calendarWeekNumberHeaderLabel?: string | undefined
        calendarWeekNumberHeaderText?: string | undefined
        calendarWeekNumberAriaLabelText?: ((weekNumber: number) => string) | undefined
      }
  }
  }
}

const DateTimePicker = ({
  defaultValue = undefined, callback, disabled = false, setIsOpened, label, error,
}: DateTimePickerProps) => {
  const locale = useLocale();

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const minTime = selectedDate.set('hour', 8).set('minute', 0);
  const maxTime = selectedDate.set('hour', 19).set('minute', 0);
  const shouldDisableDate = (day: dayjs.Dayjs) => {
    const dayIdx = day.day();
    return dayIdx === 6 || dayIdx === 0;
  };

  const handleDateChange = (value: any) => {
    setSelectedDate(value);
  };

  const onClose = useCallback(() => {
    setTimeout(() => {
      setIsOpened(false);
    }, 0);
  }, [setIsOpened]);

  const setLocaleText = useCallback((): localeTextType => {
    if (locale === 'uk') {
      return ukUA;
    } if (locale === 'en') {
      return enUS;
    }
    return ruRU;
  }, [locale]);
  const errorMessage = error ? FormFieldErrors[error as keyof typeof FormFieldErrors] : undefined;
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={setLocaleText().components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <div
        className={cls.dateTimePickerWrapper}
      >
        <Label label={errorMessage || label} className={cls.label} />
        <MuiDateTimePicker
          defaultValue={defaultValue}
          className={cls.dateTimePicker}
          ampm={false}
          onOpen={() => setIsOpened(true)}
          onClose={onClose}
          minTime={minTime}
          maxTime={maxTime}
          onChange={handleDateChange}
          reduceAnimations
          onAccept={(value) => {
            callback(value!!);
          }}
          shouldDisableDate={shouldDisableDate}
          disabled={disabled}
          format="DD.MM.YYYY  HH:mm"
          sx={{
            '.MuiInputBase-input': { color: 'var(--text-color)' },
            '.MuiOutlinedInput-notchedOutline': { borderColor: errorMessage ? 'red' : 'var(--border-color)' },
            '.MuiFormControl-root-MuiTextField-root': { borderColor: 'orange' },
            '.MuiOutlinedInput-notchedOutline .Mui-focused': { borderColor: 'rgba(82, 82, 255, 0.74)' },
            '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
              { borderColor: 'rgba(82, 82, 255, 0.74)' },
          }}
          slotProps={{
            popper: {
              sx: {
                '.MuiPaper-root': { backgroundColor: 'var(--bg-color)' },
                '.Mui-selected': { backgroundColor: 'rgba(82, 82, 255, 0.74)' },
                '.MuiPickersDay-root.Mui-selected': { backgroundColor: 'rgba(82, 82, 255, 0.74)' },
                '.MuiPickersYear-yearButton.Mui-selected': { backgroundColor: 'rgba(82, 82, 255, 0.74)' },
                '.Mui-selected:focus': { backgroundColor: 'rgba(82, 82, 255, 0.74)' },
                '.Mui-selected: hover': { backgroundColor: 'rgba(82, 82, 255, 1)' },
                '.MuiPickersDay-root.Mui-selected:hover': { backgroundColor: 'rgba(82, 82, 255, 1)' },
                '.MuiMenuItem-root.Mui-selected': {
                  backgroundColor: 'rgba(82, 82, 255, 1)',
                  color: 'var(--text-color-inverted)',
                },
                '.MuiPickersDay-root:hover': { backgroundColor: 'var(--hover-color)' },
                '.MuiButtonBase-root:hover': { backgroundColor: 'var(--hover-color)' },
                '.MuiPickersCalendarHeader-label': { color: 'var(--text-color)' },
                '.MuiPickersYear-root': { color: 'var(--text-color)' },
                '.Mui-disabled': { color: 'var(--text-color)', opacity: 0.2 },
                '.MuiPickersDay-root': { color: 'var(--text-color)' },
                '.MuiPickersDay-root.Mui-disabled': { color: 'var(--text-color)' },
                '.MuiDayCalendar-weekDayLabel': { color: 'var(--text-color)' },
                '.MuiButtonBase-root': { color: 'var(--text-color)' },
                '.MuiPickersDay-today': { borderColor: 'var(--hover-color)' },
              },
            },
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DateTimePicker;
