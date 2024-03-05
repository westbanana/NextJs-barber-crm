'use client';

import React, {
  HTMLProps, memo, useRef, useState,
} from 'react';

import TimeSelector from '@/components/testPicker/TimeSelector';

import cls from './style.module.scss';

export type Time = {
  from: string;
  to: string;
};

export interface TestPickerProps extends HTMLProps<HTMLDivElement>{
  label: string;
  workScheduleTime?: Time;
}

const TimePicker = memo(({
  label,
  workScheduleTime = { from: '00', to: '00' },
}:TestPickerProps) => {
  const [time, setTime] = useState<Time>(workScheduleTime);
  const [open, setOpen] = useState<boolean>(false);
  const currentTime = `${time.from}:${time.to}`;
  const refTimePicker = useRef<HTMLDivElement>(null);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Time) => {
    const value = Number(e.target.value);
    const inputMaxNumber = Number(e.target.max) - 1;
    setTime((prevState) => {
      const { from, to } = prevState;
      const fromNumber = Number(from);

      if (value > inputMaxNumber && field === 'to') {
        if (fromNumber >= 24) {
          return {
            to: '00',
            from: '00',
          };
        }
        const nextFrom = fromNumber < 10 ? `0${fromNumber + 1}` : `${fromNumber + 1}`;
        return {
          from: nextFrom,
          [field]: '00',
        };
      }

      const newValue = value < 10 ? `0${value}` : value;
      return {
        ...prevState,
        [field]: newValue,
      };
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div
      id="timePicker"
      ref={refTimePicker}
      className={cls.timePicker}
      onClick={(e) => {
        e.stopPropagation();
        setOpen(true);
      }}
    >
      <label className={cls.label} htmlFor="timePicker">{label}</label>
      {currentTime}
      {(open && refTimePicker.current) && (
        <TimeSelector
          onChange={onChangeHandler}
          time={time}
          opened={open}
          onClose={onClose}
          parentId="timePicker"
          parentRef={refTimePicker}
        />
      )}
    </div>
  );
});

export default TimePicker;
