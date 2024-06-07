'use client';

import React, { useEffect } from 'react';

import Page from '@components/ui/Page/Page';
import EmployeeCompletedEntries from '@components/Statistic/StatisticComponents/EmployeeCompletedEntries';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getEntriesLoading } from '@components/Entry/selectors/getEntriesLoading';
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';
import { getEmployeeList } from '@components/Employee/EmployeeList/selectors/getEmployeeList';
import CurrentYearCompletedEntries from '@components/Statistic/StatisticComponents/CurrentYearCompletedEntries';
import { getEntryList } from '@components/Entry/selectors/getEntryList';
import { getEmployeeLoading } from '@components/Employee/EmployeeCard/selectors/getEmployeeLoading';
import Label from '@components/Label/Label';

import cls from './style.module.scss';

const StatisticPage = () => {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(getEmployeeList);
  const entries = useAppSelector(getEntryList);
  const entriesLoading = useAppSelector(getEntriesLoading);
  const employeesLoading = useAppSelector(getEmployeeLoading);

  useEffect(() => {
    dispatch(fetchTodayEntries());
  }, [dispatch]);
  return (
    <Page className={cls.statisticPage}>
      {entriesLoading || employeesLoading
        ? <span>loading...</span>
        : (
          <>
            <div className={cls.containerWithLabel}>
              <Label label="Employee completed entries" alwaysOnBorder />
              <EmployeeCompletedEntries employees={employees} />
            </div>
            <div className={cls.containerWithLabel}>
              <Label label="Current year completed entries" alwaysOnBorder />
              <CurrentYearCompletedEntries entries={entries} />
            </div>
          </>
        )}
    </Page>
  );
};

export default StatisticPage;
