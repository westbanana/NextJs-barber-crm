'use client';

import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  Calendar as BigCalendar, Components, dayjsLocalizer, Event, SlotInfo,
} from 'react-big-calendar';

import Label from '@components/Label/Label';
import { IClient, IEntry } from '@components/Entry/MiniEntry/entries.type';

import 'react-big-calendar/lib/sass/styles.scss';
import './style.css';
import { classNames } from '@lib/classNames/classNames';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { changeOpenedEntry } from '@components/Entry/slices/entrySlice';
import { EntryCardMode } from '@components/Entry/EntryCard/entry-card.type';
import EventAgenda from '@components/Calendar/components/EventAgenda';
import EventDay from '@components/Calendar/components/EventDay';
import { newEntry } from '@constants/newEntry';

import cls from './style.module.scss';

interface EntriesEventsReturn extends Event {
  data?: IEntry
}

interface CalendarProps {
  entries: IEntry[],
}

const Calendar = ({ entries }: CalendarProps) => {
  const dispatch = useAppDispatch();
  const localizer = dayjsLocalizer(dayjs);

  const entriesEvents: EntriesEventsReturn[] = (entries).map((entry) => ({
    title: 'Запис',
    data: entry,
    start: dayjs(`${entry.date} ${entry.time}`).toDate(),
    end: dayjs(`${entry.date} ${entry.time}`).add(30, 'minutes').toDate(),
  }));
  const components: Components = {
    agenda: {
      event: EventAgenda,
    },
    day: {
      event: EventDay,
    },
  };

  const onDoubleClickEventHandler = useCallback(({ data }: EntriesEventsReturn) => {
    if (data) {
      dispatch(changeOpenedEntry({
        entry: data,
        mode: EntryCardMode.EDIT,
      }));
    }
  }, [dispatch]);
  const onSelectSlotHandler = (slotInfo: SlotInfo) => {
    const currentSlotDate = dayjs(slotInfo.slots[0]);
    const today = dayjs();
    if (currentSlotDate.isSame(today) || currentSlotDate.isAfter(today)) {
      const currentSlotDateFormatted = currentSlotDate.format('YYYY-MM-DD');
      dispatch(changeOpenedEntry({
        entry: { ...newEntry, date: currentSlotDateFormatted },
        mode: EntryCardMode.CREATE,
      }));
    }
  };

  return (
    <div className={classNames(cls.wrapper, {}, ['afterLoading'])} id="calendar-wrapper">
      <Label label="Calendar" alwaysOnBorder />
      <BigCalendar
        components={components}
        localizer={localizer}
        events={entriesEvents}
        step={60}
        onSelectSlot={onSelectSlotHandler}
        popup
        selectable
        onDoubleClickEvent={(event) => onDoubleClickEventHandler(event)}
      />
    </div>
  );
};

export default Calendar;
