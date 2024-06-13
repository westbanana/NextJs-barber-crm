import React from 'react';
import { Event, EventProps, DateCellWrapperProps } from 'react-big-calendar';
import dayjs from 'dayjs';

import { IClient, IEntry } from '@components/Entry/MiniEntry/entries.type';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';

interface EntriesEventsReturn extends Event {
  data?: IEntry
}
const DayColumnWrapper = ({ value, children }: DateCellWrapperProps) => {
  const isWeekend = dayjs(value).day() === 0 || dayjs(value).day() === 6; // Воскресенье или суббота
  return React.cloneElement(React.Children.only(children), {
    style: {
      ...children.props.style,
      opacity: isWeekend ? '0.6' : '',
    },
  });
};
export default DayColumnWrapper;
