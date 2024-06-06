'use client';

import React from 'react';
import dayjs from 'dayjs';
import { Calendar as BigCalendar, dayjsLocalizer, Event } from 'react-big-calendar';

import Label from '@components/Label/Label';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getEntryList } from '@components/Entry/selectors/getEntryList';

import cls from './style.module.scss';
import 'react-big-calendar/lib/sass/styles.scss';
import './style.css';

const Calendar = () => {
  const localizer = dayjsLocalizer(dayjs);
  const entries = useAppSelector(getEntryList);
  const entriesEvents: Event[] = entries.map((entry) => ({
    title: 'Запись',
    start: dayjs(`${entry.date} ${entry.time}`).toDate(),
    end: dayjs(`${entry.date} ${entry.time}`).add(30, 'minutes').toDate(),
  }));
  return (
    <div className={cls.wrapper} id="calendar-wrapper">
      <Label label="Calendar" alwaysOnBorder />
      <BigCalendar
        localizer={localizer}
        events={entriesEvents}
        step={60}
        popup={false}
      />
    </div>
  );
};

export default Calendar;
