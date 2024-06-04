import React from 'react';
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';

import { StatisticTooltipProps } from '@components/Statistic/statistic.types';
import cls from '@components/Statistic/StatisticComponents/style.module.scss';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getEmployeeList } from '@components/Employee/EmployeeList/selectors/getEmployeeList';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';

const EmployeeCompletedEntriesTooltip = ({
  payload, active, label,
}: StatisticTooltipProps) => {
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

const EmployeeCompletedEntries = () => {
  const employees = useAppSelector(getEmployeeList);
  const data = employees.map((employee: IEmployee) => ({
    name: employee.name,
    completed: employee.completedEntries.length,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<EmployeeCompletedEntriesTooltip />} cursor={{ fill: 'var(--chart-inverted)' }} />
        <Bar dataKey="completed" fill="var(--chart)" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default EmployeeCompletedEntries;