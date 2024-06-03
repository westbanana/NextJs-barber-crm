import React, { useState } from 'react';
import { AlignLeft } from 'lucide-react';

import Select from '@components/ui/Select/Select';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getEntriesLoading } from '@components/Entry/selectors/getEntriesLoading';
import EmployeeCompletedEntries from '@components/Statistic/StatisticComponents/EmployeeCompletedEntries';
import CurrentYearCompletedEntries from '@components/Statistic/StatisticComponents/CurrentYearCompletedEntries';

import cls from './style.module.scss';

export type StatisticCompletedEntries = {
  name: string;
  entries: number;
  earnedMoney: number;
}

const Statistic = () => {
  const loading = useAppSelector(getEntriesLoading);
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [def, setDef] = useState<string>('1');

  const statisticArray = [
    <EmployeeCompletedEntries />,
    <CurrentYearCompletedEntries />];
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
