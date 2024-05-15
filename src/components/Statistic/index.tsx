import React, { useState } from 'react';
import {
  AreaProps,
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import StatisticTooltip from '@components/Statistic/StatisticTooltip';
import Select from '@components/ui/Select/Select';
import { AlignLeft } from 'lucide-react';

import cls from './style.module.scss';

const Statistic = ({ employees }: {employees: IEmployee[]}) => {
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const data = employees.map((employee: IEmployee) => ({
    name: employee.name,
    completed: employee.completedEntries.length,
  }));
  const showSelectHandler = () => setShowSelect(!showSelect);
  return (
    <>
      {showSelect && (
        <Select data={[]} label="Types" defaultValue={[]} className={cls.typesSelect} />
      )}
      <AlignLeft className={cls.selectToggle} onClick={showSelectHandler} />
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<StatisticTooltip />} cursor={{ fill: 'var(--chart-inverted)' }} />
          <Bar dataKey="completed" fill="var(--chart)" activeBar={{ }} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Statistic;
