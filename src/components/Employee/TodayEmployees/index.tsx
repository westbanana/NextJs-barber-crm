'use client';

import React from 'react';
import dayjs from 'dayjs';

import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getEmployeeList } from '@components/Employee/EmployeeList/selectors/getEmployeeList';
import { days } from '@constants/days';
import ExpandableContainer from '@components/ExpandableContainer';
import { getEmployeeLoading } from '@components/Employee/EmployeeCard/selectors/getEmployeeLoading';
import TodayEmployeeCard from '@components/Employee/TodayEmployees/TodayEmployeeCard';

const TodayEmployees = () => {
  const employees = useAppSelector(getEmployeeList);
  const loading = useAppSelector(getEmployeeLoading);
  const today = +dayjs().format('d');

  const todayEmployees = employees.filter((employe) => {
    const from = days.findIndex((day) => day === employe.work_schedule.days.from) + 1;
    const to = days.findIndex((day) => day === employe.work_schedule.days.to) + 1;
    return today >= from && today <= to;
  });

  return (
    <ExpandableContainer label="Today Employees" loading={loading}>
      {employees.map((employee) => <TodayEmployeeCard key={employee.id} employee={employee} />)}
    </ExpandableContainer>
  );
};

export default TodayEmployees;
