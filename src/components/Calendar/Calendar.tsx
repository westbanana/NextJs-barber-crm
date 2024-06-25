'use client';

import React, {
  useCallback, useState,
} from 'react';
import dayjs from 'dayjs';
import {
  Calendar as BigCalendar, Components, dayjsLocalizer, Event, SlotInfo,
} from 'react-big-calendar';

import Label from '@components/Label/Label';
import { IEntry } from '@components/Entry/MiniEntry/entries.type';
import 'react-big-calendar/lib/sass/styles.scss';
import './style.css';
import { classNames } from '@lib/classNames/classNames';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { changeOpenedEntry } from '@components/Entry/slices/entrySlice';
import { EntryCardMode } from '@components/Entry/EntryCard/entry-card.type';
import EventAgenda from '@components/Calendar/components/EventAgenda';
import { newEntry } from '@constants/newEntry';
import CalendarPopup, { CalendarPopupData } from '@components/Calendar/components/CalendarPopup';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import EventMonth from '@components/Calendar/components/EventMonth';

import cls from './style.module.scss';

export interface EntriesEventsReturn extends Event {
  data?: IEntry
}

interface CalendarProps {
  entries: IEntry[],
}
const localizer = dayjsLocalizer(dayjs);

const Calendar = ({ entries }: CalendarProps) => {
  const dispatch = useAppDispatch();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupData, setPopupData] = useState<CalendarPopupData>();
  const entriesEvents: EntriesEventsReturn[] = (entries).map((entry) => ({
    title: `${(entry.employee as IEmployee)?.name} - ${entry.time}`,
    data: entry,
    start: dayjs(`${entry.date} ${entry.time}`).toDate(),
    end: dayjs(`${entry.date} ${entry.time}`).add(30, 'minutes').toDate(),
  }));

  const components: Components = {
    agenda: {
      event: EventAgenda,
    },
    month: {
      event: EventMonth,
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

  const openPopup = (data: CalendarPopupData) => {
    setShowPopup(true);
    setPopupData(data);
  };

  const onShowMoreHandler = useCallback((events: EntriesEventsReturn[], date: Date) => {
    openPopup({
      events,
      date,
    });
  }, []);

  const onPopupCloseHandler = () => setShowPopup(false);

  return (
    <div className={classNames(cls.wrapper, {}, ['afterLoading'])} id="calendar-wrapper">
      <Label label="Calendar" alwaysOnBorder />
      <BigCalendar
        components={components}
        localizer={localizer}
        events={entriesEvents}
        doShowMoreDrillDown={false}
        step={60}
        onSelectSlot={onSelectSlotHandler}
        popup={false}
        onShowMore={onShowMoreHandler}
        onDoubleClickEvent={(event) => onDoubleClickEventHandler(event)}
      />
      {(showPopup && popupData)
        && (
          <CalendarPopup
            data={popupData}
            onDoubleClickEvent={onDoubleClickEventHandler}
            onClose={onPopupCloseHandler}
          />
        )}
    </div>
  );
};

export default Calendar;
