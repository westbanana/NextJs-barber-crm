import React, { useState } from 'react';
import { AlignLeft } from 'lucide-react';

import Select from '@components/ui/Select/Select';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getEntriesLoading } from '@components/Entry/selectors/getEntriesLoading';
import EmployeeCompletedEntries from '@components/Statistic/StatisticComponents/EmployeeCompletedEntries';
import CurrentYearCompletedEntries from '@components/Statistic/StatisticComponents/CurrentYearCompletedEntries';
import { getEmployeeList } from '@components/Employee/EmployeeList/selectors/getEmployeeList';
import { getAllEntries } from '@components/Entry/services/getTodayEntries';
import { getEntryList } from '@components/Entry/selectors/getEntryList';

import cls from './style.module.scss';

export type StatisticCompletedEntries = {
  name: string;
  entries: number;
  earnedMoney: number;
}

const Statistic = () => {
  const loading = useAppSelector(getEntriesLoading);
  const employees = useAppSelector(getEmployeeList);

  return (!loading && (
    <>
      <EmployeeCompletedEntries employees={employees} />
    </>
  )
  );
};

export default Statistic;
