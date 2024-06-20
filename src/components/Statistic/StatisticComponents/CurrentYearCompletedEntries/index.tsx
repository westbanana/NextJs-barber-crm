'use client';

import React, { useEffect, useState } from 'react';
import {
  CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';

import { StatisticTooltipProps } from '@components/Statistic/statistic.types';
import cls from '@components/Statistic/StatisticComponents/style.module.scss';
import { getCurrentYearCompletedEntries } from '@helpers/getCurrentYearCompletedEntries';
import { IEntry } from '@components/Entry/MiniEntry/entries.type';
import EmptyStatistic from '@components/Statistic/StatisticComponents/EmptyStatistic/indext';

const CurrentYearCompletedEntriesTooltip = ({
  payload, active, label,
}: StatisticTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className={cls.mainContainer}>
        <span className={cls.label}>{label}</span>
        <span className={cls.desc}>{`Completed entries: ${payload[0].value}`}</span>
        <span className={cls.desc}>{`Money earned: ${payload[1].value}`}</span>
      </div>
    );
  }
  return null;
};

interface CurrentYearCompletedEntriesProps {
  entries: IEntry[]
}

const CurrentYearCompletedEntries = ({ entries }:CurrentYearCompletedEntriesProps) => {
  const completedEntries = getCurrentYearCompletedEntries(entries);
  return (
    !entries.length
      ? (<EmptyStatistic description="No one entries💇‍♂️.️" />)
      : (
        <ResponsiveContainer width="100%" height="100%" className="afterLoading">
          <LineChart
            data={completedEntries}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CurrentYearCompletedEntriesTooltip />} cursor={{ fill: 'var(--chart-inverted)' }} />
            <Legend />
            <Line type="monotone" dataKey="entries" stroke="#8884d8" />
            <Line type="monotone" dataKey="earnedMoney" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      )
  );
};

export default CurrentYearCompletedEntries;
