'use client';

import React from 'react';
import dayjs from 'dayjs';

import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getEmployeeList } from '@components/Employee/EmployeeList/selectors/getEmployeeList';
import { days } from '@constants/days';
import TopCard from '@components/TopCard/TopCard';
import ExpandableContainer from '@components/ExpandableContainer';

const TodayEmployees = () => {
  const employees = useAppSelector(getEmployeeList);
  const today = +dayjs().format('d');

  const todayEmployees = employees.filter((employe) => {
    const from = days.findIndex((day) => day === employe.work_schedule.days.from) + 1;
    const to = days.findIndex((day) => day === employe.work_schedule.days.to) + 1;
    return today >= from && today <= to;
  });

  return (
    <ExpandableContainer label="Today Employees">
      {employees.map((employee) => <TopCard key={employee.id} employee={employee} />)}
    </ExpandableContainer>
  );
};

export default TodayEmployees;
