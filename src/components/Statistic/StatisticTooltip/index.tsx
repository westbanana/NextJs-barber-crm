import React from 'react';
import { TooltipProps } from 'recharts';
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';

import cls from './style.module.scss';

const StatisticTooltip = ({ payload, active, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className={cls.mainContainer}>
        <span className={cls.label}>{label}</span>
        <span className={cls.desc}>{`has ${payload[0].value} completed entries`}</span>
      </div>
    );
  }

  return null;
};

export default StatisticTooltip;
