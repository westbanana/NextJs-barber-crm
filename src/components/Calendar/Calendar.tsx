'use client';

import React, { useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import {
  Calendar as BigCalendar, dayjsLocalizer, Event, EventProps, Components,
} from 'react-big-calendar';

import Label from '@components/Label/Label';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getEntryList } from '@components/Entry/selectors/getEntryList';
import { IEntry } from '@components/Entry/MiniEntry/entries.type';

import 'react-big-calendar/lib/sass/styles.scss';
import './style.css';
import { getEntriesLoading } from '@components/Entry/selectors/getEntriesLoading';
import Skeleton from '@components/ui/Skeleton/Skeleton';
import { classNames } from '@lib/classNames/classNames';
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';

import cls from './style.module.scss';

const Calendar = () => {
  const dispatch = useAppDispatch();
  const localizer = dayjsLocalizer(dayjs);
  const loading = useAppSelector(getEntriesLoading);
  const entries = useAppSelector(getEntryList);
  useEffect(() => {
    dispatch(fetchTodayEntries());
  }, [dispatch]);
  const entriesEvents: Event[] = entries.map((entry) => ({
    title: 'Запись',
    data: entry,
    start: dayjs(`${entry.date} ${entry.time}`).toDate(),
    end: dayjs(`${entry.date} ${entry.time}`).add(30, 'minutes').toDate(),
  }));

  // const EventAgenda = ({ event }: {event: Event}) => (
  //   <span>
  //     <em style={{ color: 'magenta' }}>{event.title}</em>
  //     <p>{event?.data.date}</p>
  //   </span>
  // );
  // const { components, defaultDate } = useMemo(
  //   () => ({
  //     components: {
  //       agenda: {
  //         event: EventAgenda,
  //       },
  //       event: Event,
  //     },
  //     defaultDate: new Date(2015, 3, 7),
  //   }),
  //   [],
  // );

  return (
    loading
      ? <Skeleton rounded height="270px" width="100%" />
      : (
        <div className={classNames(cls.wrapper, {}, ['afterLoading'])} id="calendar-wrapper">
          <Label label="Calendar" alwaysOnBorder />
          <BigCalendar
          // components={components}
            localizer={localizer}
            events={entriesEvents}
            step={60}
            popup={false}
          />
        </div>
      )
  );
};

export default Calendar;
