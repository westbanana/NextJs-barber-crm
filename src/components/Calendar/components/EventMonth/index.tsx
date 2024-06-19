import React from 'react';
import { EventProps } from 'react-big-calendar';

import { EntriesEventsReturn } from '@components/Calendar/Calendar';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { IClient } from '@components/Entry/MiniEntry/entries.type';
import { IBarberServices } from '@constants/barber-services';
import MonthEventTooltip from '@components/Calendar/components/EventMonth/tooltip';

const EventMonth = ({ event }: EventProps<EntriesEventsReturn>) => {
  const { data } = event;
  return (data && (
    <>
      <div
        data-tooltip-id={`month-event-tooltip-${data.id}`}
      >
        {event.title}
      </div>
      <MonthEventTooltip
        id={data.id}
        employee={data.employee as IEmployee}
        client={data.client as IClient}
        time={data.time}
        date={data.date}
        services={data.services as IBarberServices[]}
      />
    </>

  ));
};

export default EventMonth;
