'use client';

import React from 'react';

import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import UserIcon from '@components/ui/UserIcon/UserIcon';
import Tooltip from '@components/ui/Tooltip/Tooltip';

import cls from './style.module.scss';

import MiniCard from '../../../ui/MiniCard';

export interface TopCardProps {
    employee: IEmployee;
}
const TopCard = ({ employee }: TopCardProps) => {
  const [employeeFirstName, employeeLastName] = employee && employee.name
    ? employee.name.split(' ')
    : ['Unknown', 'User'];
  const employeeShortName = !employeeLastName || !employeeFirstName
    ? `${employeeLastName || ''} ${employeeFirstName}`
    : `${employeeLastName || ''} ${employeeFirstName[0]}.`;

  return (
    <MiniCard className={cls.topCard}>
      <div
        data-tooltip-id={`top-card-employee-${employee.id}`}
        className={cls.employee}
      >
        <UserIcon
          userName={employee?.name}
          value={employee?.userIcon}
          className={cls.iconSize}
        />
        <span className={cls.name}>
          {employeeShortName}
        </span>
      </div>
      <h1 className={cls.totalCompletedEntries}>{employee.completedEntries.length}</h1>
      <Tooltip id={`top-card-employee-${employee.id}`}>
        {employee.name}
      </Tooltip>
    </MiniCard>
  );
};

export default TopCard;
