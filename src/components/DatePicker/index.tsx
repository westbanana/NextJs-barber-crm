'use client';

import React, { useState } from 'react';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeView } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import './dateTimePicker.css';

import { entriesPossibleTime } from '@/constants/entriesPossibleTime';

import cls from './style.module.scss';

export type DateTimePickerProps = {
  dates: string[],
  defaultValue: dayjs.Dayjs | undefined | null
  callback: (value:dayjs.Dayjs) => void
  disabled?: boolean
}

const DateTimePicker = ({
  dates, defaultValue, callback, disabled = false,
}: DateTimePickerProps) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const minTime = selectedDate.set('hour', 8).set('minute', 0);
  const maxTime = selectedDate.set('hour', 19).set('minute', 0);
  const formattedDates = dates.map((date) => dayjs(date));
  const shouldDisableDate = (day: dayjs.Dayjs) => {
    const currentDate = day.format('YYYY-MM-DD');
    const matchingTimes = formattedDates
      .filter((date) => date.isSame(currentDate, 'day'))
      .map((date) => dayjs(date).format('HH:mm'));
    if (day.day() === 0 || day.day() === 6) {
      return true;
    }

    return matchingTimes.length === entriesPossibleTime.length;
  };

  const shouldDisableTime = (timeValue: dayjs.Dayjs, clockType: TimeView) => {
    const currentHour = timeValue.format('HH');
    const currentMinutes = parseInt(timeValue.format('mm'), 10);
    const currentDate = timeValue.format('YYYY-MM-DD');
    const matchingDate = formattedDates.some((date) => date.isSame(currentDate, 'day'));

    if (matchingDate) {
      const matchingTime = formattedDates
        .filter((date) => dayjs(date).isSame(currentDate, 'day'))
        .map((date) => dayjs(date).format('HH:mm'));
      const full = timeValue.format('HH:mm');
      if (matchingTime.includes(`${currentHour}:00`) && matchingTime.includes(`${currentHour}:30`)) {
        return true; // Время уже выбрано и нужно его отключить
      }
      if (clockType === 'minutes') {
        if (matchingTime.includes(full)) {
          return true;
        }
      }
    }
    return currentMinutes % 30 !== 0;
  };

  const handleDateChange = (value: any) => {
    setSelectedDate(value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={cls.dateTimePickerWrapper}>
        <MuiDateTimePicker
          defaultValue={defaultValue}
          className={cls.dateTimePicker}
          ampm={false}
          disablePast
          minTime={minTime}
          maxTime={maxTime}
          onChange={handleDateChange}
          minutesStep={30}
          reduceAnimations
          onAccept={(value) => {
            callback(value!!);
          }}
          shouldDisableDate={shouldDisableDate}
          shouldDisableTime={shouldDisableTime}
          disabled={disabled}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DateTimePicker;
