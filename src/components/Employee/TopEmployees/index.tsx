import React from 'react';
import { getTranslations } from 'next-intl/server';

import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import TopCard from '@components/Employee/TopEmployees/TopCard/TopCard';
import { getTopEmployees } from '@components/Entry/services/getEmployees';

import cls from './style.module.scss';

import ExpandableContainer from '../../ui/ExpandableContainer';

const TopEmployees = async () => {
  const t = await getTranslations();
  const topTreeEmployees:IEmployee[] = await getTopEmployees();

  return (
    <ExpandableContainer label={t('top-employees.label')} className={cls.expand}>
      {topTreeEmployees.length
        ? (
          topTreeEmployees.map((employee: IEmployee) => (
            <TopCard key={employee.id} employee={employee} />
          ))
        )
        : (
          <span className={cls.no}>
            {`${t('top-employees.empty')}💇‍♂️.️`}
          </span>
        )}
    </ExpandableContainer>
  );
};

export default TopEmployees;
