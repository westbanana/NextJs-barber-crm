import React from 'react';

import MiniCard from '@components/MiniCard';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';

import cls from './style.module.scss';

interface TodayEmployeeCardProps {
  employee: IEmployee
}
const TodayEmployeeCard = ({ employee }: TodayEmployeeCardProps) => (
  <MiniCard className={cls.card}>
    <span className={cls.employeeName}>{employee.name}</span>
  </MiniCard>
);

export default TodayEmployeeCard;
