import React, { useCallback, useEffect, useRef } from 'react';
import dayjs from 'dayjs';

import { EntriesEventsReturn } from '@components/Calendar/Calendar';
import Portal from '@components/Portal';
import { outsideClick } from '@helpers/outSideClick';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { changeOpenedEntry } from '@components/Entry/slices/entrySlice';
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
  const dispatch = useAppDispatch();
  const refPopup = useRef<HTMLDivElement>(null);
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    outsideClick(e, onClose, refPopup, '[data-ignore-outside-clicks]');
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

  return (
    <Portal>
      <div
        className={cls.popupBackground}
      >
        <div className={cls.popupContainer} ref={refPopup}>
          <div className={cls.date}>
            {dayjs(data.date)
              .format('DD-MM-YYYY')}
          </div>
          <div className={cls.eventList}>
            {data.events.map((event) => (
              <span
                onDoubleClick={() => onDoubleClickEvent(event)}
                className={cls.event}
                key={event.data?.id}
              >
                {event.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default CalendarPopup;
