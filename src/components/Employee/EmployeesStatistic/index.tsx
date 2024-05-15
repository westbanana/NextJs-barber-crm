'use client';

import React, { useEffect, useState } from 'react';
import { getAllEmployees, getTest } from '@components/Entry/services/getEmployees';
import Label from '@components/Label/Label';
import Statistic from '@components/Statistic';
import { Skeleton as MUISkeleton } from '@mui/material';
import { classNames } from '@lib/classNames/classNames';
import Skeleton from '@components/ui/Skeleton/Skeleton';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getEmployeeList } from '@components/Employee/EmployeeList/selectors/getEmployeeList';
import { getClientsAndEmployees } from '@components/Entry/selectors/getClientsAndEmployees';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { getEntriesLoading } from '@components/Entry/selectors/getEntriesLoading';

import cls from './style.module.scss';

const EmployeeStatistics = () => {
  const { employees } = useAppSelector(getClientsAndEmployees);
  const loading = useAppSelector(getEntriesLoading);

  return (loading
    ? <Skeleton rounded height={234} />
    : (
      <div className={classNames(cls.statisticsWrapper, {}, [])}>
        <Label label="Statistics" alwaysOnBorder />
        <Statistic employees={employees} />
      </div>
    )
  );
};

export default EmployeeStatistics;
