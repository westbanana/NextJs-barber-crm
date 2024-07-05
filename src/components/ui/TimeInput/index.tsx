'use client';

import React, { memo, useState } from 'react';

import Label from '@components/ui/Label/Label';

import cls from './style.module.scss';

export enum timeFieldType {
  HOUR = 'hour',
  MINUTE = 'minute',
}

const TimeInput = ({ time, callback, label = '' }: {label?: string, time: string, callback: (value: string) => void}) => {
  const [hour, minute] = time.split(':');
  const [hourValue, setHoursValue] = useState(hour);
  const [minuteValue, setMinuteValue] = useState(minute);
  const [oldHourValue, setOldHourValue] = useState(hour);
  const [oldMinuteValue, setOldMinuteValue] = useState(minute);
  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setTimeValue: (value: string) => void,
    timeType: timeFieldType,
  ) => {
    const numTargetValue = Number(e.target.value);
    const numMax = Number(e.target.max);
    const responseTimeValue = numTargetValue < 10 ? `0${numTargetValue}` : `${numTargetValue}`;
    if (timeType === timeFieldType.HOUR) {
      if (numTargetValue >= numMax) {
        setTimeValue('00');
        return;
      }
    }
    if (timeType === timeFieldType.MINUTE) {
      if (numTargetValue >= numMax) {
        setTimeValue('00');
        setHoursValue((prev) => {
          if (prev === '23') return '00';
          return `${Number(prev) + 1 < 10 ? `0${Number(prev) + 1}` : Number(prev) + 1}`;
        });
        return;
      }
    }
    setTimeValue(responseTimeValue);
  };
  const onBlur = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue:(value: string) => void,
    setOldValue: (value: string) => void,
    oldValue: string,
  ) => {
    const max = Number(e.target.max);
    const min = Number(e.target.min);
    const targetValue = Number(e.target.value);
    const validTime = targetValue >= min && targetValue <= max;
    const formattedValue = targetValue < 10 ? `0${targetValue}` : `${targetValue}`;
    if (validTime) {
      setValue(formattedValue);
      setOldValue(formattedValue);
      callback(formattedValue);
    } else {
      setValue(oldValue);
    }
  };

  const onMinuteBlur = (e:React.ChangeEvent<HTMLInputElement>) => {
    onBlur(e, setMinuteValue, setOldMinuteValue, oldMinuteValue);
  };

  const onHourBlur = (e:React.ChangeEvent<HTMLInputElement>) => {
    onBlur(e, setHoursValue, setOldHourValue, oldHourValue);
  };

  return (
    <div className={cls.timeWrapper}>
      <Label
        alwaysOnBorder
        label={label}
        style={{
          fontSize: '12px',
          color: 'var(--text-color)',
          fontWeight: 'normal',
        }}
      />
      <input
        type="number"
        max={24}
        min={0}
        value={hourValue}
        onChange={(e) => handleTimeChange(e, setHoursValue, timeFieldType.HOUR)}
        onBlur={() => callback(`${hourValue}:${minuteValue}`)}
      />
      :
      <input
        type="number"
        max={60}
        min={0}
        value={minuteValue}
        onChange={(e) => handleTimeChange(e, setMinuteValue, timeFieldType.MINUTE)}
        onBlur={() => callback(`${hourValue}:${minuteValue}`)}
      />
    </div>
  );
};

export default TimeInput;
