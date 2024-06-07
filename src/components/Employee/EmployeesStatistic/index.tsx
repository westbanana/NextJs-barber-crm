'use client';

import React from 'react';

import Label from '@components/Label/Label';
import Statistic from '@components/Statistic';
import { classNames } from '@lib/classNames/classNames';
import Skeleton from '@components/ui/Skeleton/Skeleton';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getEntriesLoading } from '@components/Entry/selectors/getEntriesLoading';
import { getEmployeeLoading } from '@components/Employee/EmployeeCard/selectors/getEmployeeLoading';

import cls from './style.module.scss';

const EmployeeStatistics = () => {
  const loading = useAppSelector(getEntriesLoading);

  return (loading
    ? <Skeleton rounded height="300px" width="100%" />
    : (
      <div className={classNames(cls.statisticsWrapper, {}, [])}>
        <Label label="Statistics" alwaysOnBorder />
        <Statistic />
      </div>
    )
  );
};

export default EmployeeStatistics;
