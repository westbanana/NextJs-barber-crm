import React, {
  Fragment, useCallback, useEffect, useRef,
} from 'react';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';

import { EntriesEventsReturn } from '@components/Calendar/Calendar';
import Portal from '@components/Portal';
import { outsideClick } from '@helpers/outSideClick';
import { classNames } from '@lib/classNames/classNames';
import animations from '@variables/animations/animations.module.scss';
import { IClient, IEntry } from '@components/Entry/MiniEntry/entries.type';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { IBarberServices } from '@constants/barber-services';
import CalendarPopupTooltip from '@components/Calendar/components/CalendarPopup/tooltip';
import Button from '@components/ui/Button/Button';
import { changeOpenedEntry } from '@components/Entry/slices/entrySlice';
import { newEntry } from '@constants/newEntry';
import { EntryCardMode } from '@components/Entry/EntryCard/entry-card.type';

import cls from './style.module.scss';

export interface CalendarPopupData {
  events: EntriesEventsReturn[],
  date: Date
}

interface CalendarPopupProps {
  data: CalendarPopupData
  onDoubleClickEvent: (event: EntriesEventsReturn) => void
  onClose: () => void
}

const CalendarPopup = ({ data, onDoubleClickEvent, onClose }: CalendarPopupProps) => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const refPopup = useRef<HTMLDivElement>(null);
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    outsideClick({
      event: e,
      callback: onClose,
      ref: refPopup,
      disableContainerSelector: '[data-ignore-outside-clicks]',
    });
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick, onClose]);

  const onEscapeDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', onEscapeDown);
    return () => document.removeEventListener('keypress', onEscapeDown);
  }, [onEscapeDown]);
  const onAddEntry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const formattedDate = dayjs(data.date).format('YYYY-MM-DD');
    dispatch(changeOpenedEntry({
      entry: { ...newEntry, date: formattedDate },
      mode: EntryCardMode.CREATE,
    }));
  };
  return (
    <Portal>
      <div
        className={cls.popupBackground}
      >
        <div className={classNames(cls.popupContainer, {}, [animations.fadeIn])} ref={refPopup}>
          <div className={cls.date}>
            {dayjs(data.date)
              .format('DD-MM-YYYY')}
          </div>
          <div className={cls.eventList}>
            {data.events.map((event) => {
              const {
                date, time, services, id, client, employee,
              } = event.data as IEntry;
              return (
                <Fragment key={event.data?.id}>
                  <span
                    data-tooltip-id={`event-tooltip-${id}`}
                    onDoubleClick={() => onDoubleClickEvent(event)}
                    className={cls.event}
                    key={id}
                  >
                    {event.title}
                  </span>
                  <CalendarPopupTooltip
                    id={id}
                    employee={employee as IEmployee}
                    client={client as IClient}
                    time={time}
                    date={date}
                    services={services as IBarberServices[]}
                  />
                </Fragment>
              );
            })}
          </div>
          <Button onClick={onAddEntry}>
            {t('calendar.popup.add-entry')}
          </Button>
        </div>
      </div>
    </Portal>
  );
};

export default CalendarPopup;
