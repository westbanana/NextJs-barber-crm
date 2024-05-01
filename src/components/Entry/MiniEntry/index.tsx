import React from 'react';
import {
  Check, Menu, User, X,
} from 'lucide-react';
import UserIcon from '@components/ui/UserIcon/UserIcon';
import TotalPrice from '@components/Entry/TotalPrice';
import Info from '@components/Entry/Info';
import { classNames } from '@lib/classNames/classNames';
import { EntryProps, IClient } from '@components/Entry/MiniEntry/entries.type';
import { IBarberServices } from '@constants/barber-services';
import EntryOpener from '@components/Entry/EntryOpener';
import { EntryCardMode } from '@components/Entry/EntryCard/entry-card.type';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import MiniEntryController from '@components/Entry/MiniEntry/MiniEntryController';

import cls from './style.module.scss';

const MiniEntry = ({
  currentEntry,
}:EntryProps) => {
  const {
    employee, time, client, services, id, date,
  } = currentEntry;
  const [employeeFirstName, employeeLastName] = employee.name!!.split(' ');
  const [clientFirstName, clientLastName] = client.name.split(' ');
  const employeeShortName = `${employeeLastName} ${employeeFirstName[0]}.`;
  const clientShortName = `${clientLastName} ${clientFirstName[0]}.`;
  const selectedServicesNames:string[] = services.map((serv) => serv.name);
  const totalPrice = services.reduce(
    (accumulator:number, currentValue:IBarberServices) => accumulator + currentValue.price,
    0,
  );
  return (
    <EntryOpener currentEntry={currentEntry} mode={EntryCardMode.EDIT}>
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
        <MiniEntryController
          entry={currentEntry}
          className={cls.controller}
        />
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
            <Info entryInfo={currentEntry} entryId={id} />
          </div>
          <TotalPrice services={services} totalPrice={totalPrice} entryId={id} />
        </div>
      </div>
    </EntryOpener>
  );
};

export default MiniEntry;
