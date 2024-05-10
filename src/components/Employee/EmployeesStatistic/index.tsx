'use client';

import React, { useLayoutEffect, useState } from 'react';
import { getAllEmployees } from '@components/Entry/services/getEmployees';
import Label from '@components/Label/Label';
import Statistic from '@components/Statistic';
import { Skeleton as MUISkeleton } from '@mui/material';
import Skeleton from '@components/ui/Skeleton/Skeleton';
import { classNames } from '@lib/classNames/classNames';

import cls from './style.module.scss';

const EmployeeStatistics = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    getAllEmployees()
      .then(setEmployees)
      .finally(() => {
        setLoading(false);
      });
  }, [loading]);
  console.log(loading);
  return (loading
    ? <MUISkeleton variant="rectangular" width="100%" height={234} />
    : (
      <div className={classNames(cls.statisticsWrapper, {}, [])}>
        <Label label="Statistics" alwaysOnBorder />
        <Statistic employees={employees} />
      </div>
    )
  );
};

export default EmployeeStatistics;
