import React from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo/DemoContainer';
import { Dayjs } from 'dayjs';

import EntryCard from '@/components/EntryCard';
import { EmployeeCardMode } from '@/components/EmployeeCard/employee-card.type';
import DateTimePicker from '@/components/DatePicker';
import { getEntries } from '@/components/TodayEntries/services/getEntries';
import { IEntries } from '@/components/Entry/entries.type';
import { getEntriesDates } from '@/components/TodayEntries/services/getEntriesDate';

import cls from './style.module.scss';

const TestPage = async () => {
  const entriesDates:string[] = await getEntriesDates();
  return (
    <div
      className={cls.test}
    >
      <div className={cls.test2}>
        <DateTimePicker dates={entriesDates} />
      </div>
    </div>
  );
};

export default TestPage;
