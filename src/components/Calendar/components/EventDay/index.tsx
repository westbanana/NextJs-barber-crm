import React from 'react';
import { Event, EventProps } from 'react-big-calendar';

import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { IClient, IEntry } from '@components/Entry/MiniEntry/entries.type';
import Tooltip from '@components/Tooltip/Tooltip';

interface EntriesEventsReturn extends Event {
  data?: IEntry
}
const EventDay = ({ event }: EventProps<EntriesEventsReturn>) => {
  const { data } = event;
  const {
    client,
    employee,
    services,
  } = data || {};
  const employeeInfo = employee as IEmployee;
  const clientInfo = client as IClient;
  return (
    <div>
      <p>qwe</p>
    </div>
  );
};

export default EventDay;
