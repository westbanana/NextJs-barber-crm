'use client';

import React from 'react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getEmployeeList } from '@components/Employee/selectors/getEmployeeList';
import { days } from '@constants/days';
import ExpandableContainer from '@components/ExpandableContainer';
import { getEmployeeLoading } from '@components/Employee/selectors/getEmployeeLoading';
import TodayEmployeeCard from '@components/Employee/TodayEmployees/TodayEmployeeCard';
import { getEntriesLoading } from '@components/Entry/selectors/getEntriesLoading';
import cls from '@components/Employee/TopEmployees/style.module.scss';

const TodayEmployees = () => {
  const t = useTranslations();
  const employees = useAppSelector(getEmployeeList);
  const loading = useAppSelector(getEntriesLoading);

  return (
    <ExpandableContainer label={t('today-employees.label')} loading={loading} className={cls.todayEmployeesContainer}>
      {employees.length
        ? employees.map((employee) => <TodayEmployeeCard key={employee.id} employee={employee} />)
        : (
          <span className={cls.no}>
            No one employee💇‍♂️.️
          </span>
        )}
    </ExpandableContainer>
  );
};

export default TodayEmployees;
