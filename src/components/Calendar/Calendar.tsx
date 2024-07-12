'use client';

import React, {
  useCallback, useEffect, useState,
} from 'react';
import dayjs from 'dayjs';
import {
  Calendar as BigCalendar, Event, SlotInfo,
} from 'react-big-calendar';
import { useLocale, useTranslations } from 'next-intl';

import Label from '@components/ui/Label/Label';
import { IEntry } from '@components/Entry/MiniEntry/entries.type';
import 'react-big-calendar/lib/sass/styles.scss';
import './style.css';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import { classNames } from '@lib/classNames/classNames';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { changeOpenedEntry } from '@components/Entry/slices/entrySlice';
import { EntryCardMode } from '@components/Entry/EntryCard/entry-card.type';
import { newEntry } from '@constants/newEntry';
import CalendarPopup, { CalendarPopupData } from '@components/Calendar/components/CalendarPopup';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { calendarMessages } from '@components/Calendar/messages';
import { components } from '@components/Calendar/components';
import { localizer } from '@components/Calendar/localizer';

import cls from './style.module.scss';

require('globalize/lib/cultures/globalize.culture.uk');
require('globalize/lib/cultures/globalize.culture.ru');

export interface EntriesEventsReturn extends Event {
  data?: IEntry
}

interface CalendarProps {
  entries: IEntry[],
}

const Calendar = ({ entries }: CalendarProps) => {
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const locale = useLocale();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupData, setPopupData] = useState<CalendarPopupData>();
  const entriesEvents: EntriesEventsReturn[] = (entries).map((entry) => ({
    title: `${(entry.employee as IEmployee)?.name} - ${entry.time}`,
    data: entry,
    start: dayjs(`${entry.date} ${entry.time}`).toDate(),
    end: dayjs(`${entry.date} ${entry.time}`).add(30, 'minutes').toDate(),
  }));

  useEffect(() => {
    dayjs.locale(locale);
  }, [locale]);

  const onDoubleClickEventHandler = useCallback(({ data }: EntriesEventsReturn) => {
    if (data) {
      dispatch(changeOpenedEntry({
        entry: data,
        mode: EntryCardMode.EDIT,
      }));
    }
  }, [dispatch]);

  const onSelectSlotHandler = useCallback((slotInfo: SlotInfo) => {
    const disabledDays = slotInfo.slots[0].getDay() === 6 || slotInfo.slots[0].getDay() === 0;
    if (disabledDays) return;
    const currentSlotDate = dayjs(slotInfo.slots[0]);
    const today = dayjs();
    if (currentSlotDate.isSame(today) || currentSlotDate.isAfter(today)) {
      const currentSlotDateFormatted = currentSlotDate.format('YYYY-MM-DD');
      dispatch(changeOpenedEntry({
        entry: { ...newEntry, date: currentSlotDateFormatted, time: dayjs().hour(8).format('HH:mm') },
        mode: EntryCardMode.CREATE,
      }));
    }
  }, [dispatch]);

  const openPopup = useCallback((data: CalendarPopupData) => {
    setShowPopup(true);
    setPopupData(data);
  }, []);

  const onShowMoreHandler = useCallback((events: EntriesEventsReturn[], date: Date) => {
    openPopup({
      events,
      date,
    });
  }, [openPopup]);

  const onPopupCloseHandler = useCallback(() => setShowPopup(false), []);
  const dayPropGetter = useCallback((date: Date) => {
    if (dayjs(date).day() === 0 || dayjs(date).day() === 6 || dayjs(date).isBefore(dayjs(), 'day')) {
      return { className: cls.disabledDay }; // Возвращаем объект с className
    }
    return {}; // Возвращаем пустой объект, если нет класса
  }, []);
  return (
    <div className={classNames(cls.wrapper, {}, ['afterLoading'])} id="calendar-wrapper">
      <Label label={t('calendar.title')} alwaysOnBorder />
      <BigCalendar
        culture={locale}
        messages={calendarMessages[locale]}
        components={components}
        localizer={localizer}
        events={entriesEvents}
        doShowMoreDrillDown={false}
        step={60}
        dayPropGetter={dayPropGetter}
        selectable
        onSelectSlot={onSelectSlotHandler}
        popup={false}
        onShowMore={onShowMoreHandler}
        onDoubleClickEvent={onDoubleClickEventHandler}
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
