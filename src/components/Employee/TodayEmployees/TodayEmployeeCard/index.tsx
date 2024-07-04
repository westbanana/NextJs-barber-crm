import React from 'react';

import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';

import cls from './style.module.scss';

import MiniCard from '../../../ui/MiniCard';

interface TodayEmployeeCardProps {
  employee: IEmployee
}
const TodayEmployeeCard = ({ employee }: TodayEmployeeCardProps) => (
  <MiniCard className={cls.card}>
    <span className={cls.employeeName}>{employee.name}</span>
  </MiniCard>
);

export default TodayEmployeeCard;
