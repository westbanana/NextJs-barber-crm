import React, { useState } from 'react';
import { AlignLeft } from 'lucide-react';

import Select from '@components/ui/Select/Select';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getEntriesLoading } from '@components/Entry/selectors/getEntriesLoading';
import EmployeeCompletedEntries from '@components/Statistic/StatisticComponents/EmployeeCompletedEntries';
import CurrentYearCompletedEntries from '@components/Statistic/StatisticComponents/CurrentYearCompletedEntries';
import { getEmployeeList } from '@components/Employee/EmployeeList/selectors/getEmployeeList';
import { getAllEntries } from '@components/Entry/services/getTodayEntries';
import { getEntryList } from '@components/Entry/selectors/getEntryList';

import cls from './style.module.scss';

export type StatisticCompletedEntries = {
  name: string;
  entries: number;
  earnedMoney: number;
}

const Statistic = () => {
  const loading = useAppSelector(getEntriesLoading);
  const employees = useAppSelector(getEmployeeList);
  const entries = useAppSelector(getEntryList);
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [def, setDef] = useState<string>('1');

  const statisticArray = [
    <EmployeeCompletedEntries employees={employees} />,
    <CurrentYearCompletedEntries entries={entries} />];
  const showSelectHandler = () => setShowSelect(!showSelect);
  return (!loading && (
    <>
      {showSelect && (
        <Select
          data={['1', '2']}
          label="Types"
          defaultValue={['1']}
          className={cls.typesSelect}
          callback={(value) => setDef(value as string)}
        />
      )}
      <AlignLeft className={cls.selectToggle} onClick={showSelectHandler} />
      {statisticArray[+def - 1]}
    </>
  )
  );
};

export default Statistic;
