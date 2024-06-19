import React from 'react';

import Page from '@components/ui/Page/Page';
import EmployeeCompletedEntries from '@components/Statistic/StatisticComponents/EmployeeCompletedEntries';
import CurrentYearCompletedEntries from '@components/Statistic/StatisticComponents/CurrentYearCompletedEntries';
import Label from '@components/Label/Label';
import { getAllEmployees, getAllEmployeesServ } from '@components/Entry/services/getEmployees';
import { IEntry } from '@components/Entry/MiniEntry/entries.type';
import { getAllEntries, getAllEntriesServ } from '@components/Entry/services/getEntries';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';

import cls from './style.module.scss';

const StatisticPage = async () => {
  const allEmployees: IEmployee[] = await getAllEmployeesServ();
  const allEntries:IEntry[] = await getAllEntriesServ();

  return (
    <Page className={cls.statisticPage}>
      <>
        <div className={cls.containerWithLabel}>
          <Label label="Employee completed entries" alwaysOnBorder />
          <EmployeeCompletedEntries employees={allEmployees} />
        </div>
        <div className={cls.containerWithLabel}>
          <Label label="Current year completed entries" alwaysOnBorder />
          <CurrentYearCompletedEntries entries={allEntries} />
        </div>
      </>
    </Page>
  );
};

export default StatisticPage;
