import React, { useState } from 'react';
import {
  Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { AlignLeft } from 'lucide-react';
import dayjs from 'dayjs';

import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import StatisticTooltip from '@components/Statistic/StatisticTooltip';
import Select from '@components/ui/Select/Select';
import { useAppSelector } from '@lib/hooks/useAppSelector';
import { getEntriesLoading } from '@components/Entry/selectors/getEntriesLoading';
import { getEntryList } from '@components/Entry/selectors/getEntryList';

import cls from './style.module.scss';

const Statistic = ({ employees }: {employees: IEmployee[]}) => {
  // const dispatch = useAppDispatch();
  const entries = useAppSelector(getEntryList);
  const loading = useAppSelector(getEntriesLoading);
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [def, setDef] = useState<string>('1');
  const data = employees.map((employee: IEmployee) => ({
    name: employee.name,
    completed: employee.completedEntries.length,
  }));

  console.log(dayjs().month(3).format('MMMM'));

  // const completedEntries = entries.filter((entry) => entry.completed);
  // console.log(completedEntries);
  // useEffect(() => {
  //   if (!entries.length) {
  //     dispatch(fetchEntries());
  //   }
  // }, [entries]);

  const employeeCompletedEntries = (
    <BarChart
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<StatisticTooltip />} cursor={{ fill: 'var(--chart-inverted)' }} />
      <Bar dataKey="completed" fill="var(--chart)" />
    </BarChart>
  );
  const dataLine = [
    {
      name: 'Jan',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Feb',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Mar',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Apr',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'May',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Jun',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Jul',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },

    {
      name: 'Aug',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },

    {
      name: 'Sen',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Oct',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Nov',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Dec',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
  ];

  const allEntries = (
    <LineChart
      data={dataLine}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="pv" stroke="#8884d8" />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  );

  const arr = [employeeCompletedEntries, allEntries];

  const showSelectHandler = () => setShowSelect(!showSelect);
  return (!loading && (
    <>
      {showSelect && (
      // @ts-ignore
        <Select data={['1', '2']} label="Types" defaultValue="1" className={cls.typesSelect} callback={setDef} />
      )}
      <AlignLeft className={cls.selectToggle} onClick={showSelectHandler} />
      <ResponsiveContainer width="100%" height="100%">
        {/* @ts-ignore */}
        {arr[def - 1]}
      </ResponsiveContainer>
    </>
  )
  );
};

export default Statistic;
