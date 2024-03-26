import React from 'react';
import {
  Check, Menu, User, X,
} from 'lucide-react';

import { EntryProps } from '@/components/Entry/entries.type';
import UserIcon from '@/components/ui/UserIcon/UserIcon';
import { classNames } from '@/lib/classNames/classNames';
import { barberServices, IBarberServices } from '@/constants/barber-services';
import TotalPrice from '@/components/Entry/TotalPrice';
import { EntryInfo } from '@/components/Entry/Info/info.type';
import Info from '@/components/Entry/Info';

import cls from './style.module.scss';

const Entry = ({
  employee, time, client, services, id, date,
}:EntryProps) => {
  const [employeeFirstName, employeeLastName] = employee.name!!.split(' ');
  const [clientFirstName, clientLastName] = client.name.split(' ');
  const employeeShortName = `${employeeLastName} ${employeeFirstName[0]}.`;
  const clientShortName = `${clientLastName} ${clientFirstName[0]}.`;
  const selectedServices:IBarberServices[] = barberServices.filter((serv) => services.includes(serv.id));
  const selectedServicesNames:string[] = selectedServices.map((serv) => serv.serviceName);
  const totalPrice = selectedServices.reduce(
    (accumulator:number, currentValue:IBarberServices) => accumulator + currentValue.price,
    0,
  );
  const entryInfo:EntryInfo = {
    client,
    employee,
    time,
    services: selectedServices,
    date: date!!,
  };
  return (
    <div className={cls.entry}>
      <div className={cls.master}>
        <UserIcon
          userName={employee.name}
          value={employee.userIcon}
          className={cls.iconSize}
        />
        <span className={classNames(cls.name, {}, [cls.withBg])}>{employeeShortName}</span>
      </div>
      <span className={classNames(cls.time, {}, [cls.withBg])}>{time}</span>
      <div className={cls.buttons}>
        <div className={cls.button}>
          <X />
        </div>
        <div className={cls.button}>
          <Check />
        </div>
      </div>
      <div className={cls.client}>
        <div className={cls.clientInfo}>
          <div className={cls.fieldIcon}>
            <User />
            :
          </div>
          <UserIcon
            userName={client.name}
            value={client.clientIcon}
            className={cls.iconSize}
          />
          <span className={cls.name}>
            {clientShortName}
          </span>
        </div>
        <div className={cls.servicesContainer}>
          <div className={cls.fieldIcon}>
            <Menu />
            :
          </div>
          <span className={cls.services}>
            {
              selectedServicesNames.join(',')
            }
          </span>
        </div>
        <div className={cls.entryInfo}>
          <Info entryInfo={entryInfo} entryId={id} />
        </div>
        <TotalPrice services={selectedServices} totalPrice={totalPrice} entryId={id} />
      </div>
    </div>
  );
};

export default Entry;
