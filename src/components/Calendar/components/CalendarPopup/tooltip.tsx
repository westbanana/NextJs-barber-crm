import React from 'react';

import cls from '@components/Calendar/components/CalendarPopup/style.module.scss';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { IClient } from '@components/Entry/MiniEntry/entries.type';
import { IBarberServices } from '@constants/barber-services';
import Tooltip from '@components/ui/Tooltip/Tooltip';

interface CalendarPopupTooltipProps {
  id: string
  employee: IEmployee
  client: IClient
  time: string
  date: string
  services: IBarberServices[]
}
const CalendarPopupTooltip = ({
  id, client, employee, time, services, date,
}:CalendarPopupTooltipProps) => (
  <Tooltip id={`event-tooltip-${id}`}>
    <ul>
      <li>
        {`Майстер: ${(employee as IEmployee).name}`}
      </li>
      <li>
        {`Клієнт: ${(client as IClient).name}`}
      </li>
      <li>
        {`Дата: ${time}/${date}`}
      </li>
      <li>
        {`Послуги: ${(services as IBarberServices[]).map((serv) => serv.name).join(', ')}.`}
      </li>
    </ul>
  </Tooltip>
);

export default CalendarPopupTooltip;
