import React from 'react';
import { useTranslations } from 'next-intl';

import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import TopCard from '@components/Employee/TopEmployees/TopCard/TopCard';
import ExpandableContainer from '@components/ExpandableContainer';
import { getTopEmployees } from '@components/Entry/services/getEmployees';

import cls from './style.module.scss';

const TopEmployees = async () => {
  const t = useTranslations();
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
