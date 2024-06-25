import React, { memo } from 'react';
import { Menu, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

import UserIcon from '@components/ui/UserIcon/UserIcon';
import TotalPrice from '@components/Entry/TotalPrice';
import { classNames, Mods } from '@lib/classNames/classNames';
import { EntryProps, IClient } from '@components/Entry/MiniEntry/entries.type';
import { EntryCardMode } from '@components/Entry/EntryCard/entry-card.type';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import MiniEntryController from '@components/Entry/MiniEntry/MiniEntryController';
import MiniEntryInfo from '@components/Entry/MiniEntry/Info';
import Tooltip from '@components/Tooltip/Tooltip';
import MiniCard from '@components/MiniCard';
import { changeOpenedEntry } from '@components/Entry/slices/entrySlice';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { IBarberServices } from '@constants/barber-services';

import cls from './style.module.scss';

const MiniEntry = memo(({
  currentEntry,
}:EntryProps) => {
  const {
    time, services, id, completed,
  } = currentEntry;

  const t = useTranslations();
  const dispatch = useAppDispatch();
  const employee = currentEntry.employee as IEmployee;
  const client = currentEntry.client as IClient;
  const [employeeFirstName, employeeLastName] = employee?.name
    ? employee.name.split(' ')
    : ['?', '?'];
  const employeeShortName = `${employeeLastName} ${employeeFirstName[0]}.`;
  const [clientFirstName, clientLastName] = client.name.split(' ');
  const clientShortName = `${clientLastName} ${clientFirstName[0]}.`;
  const selectedServicesNames:string[] = (services as IBarberServices[]).map((serv) => serv.name);
  const entryMods:Mods = {
    [cls.completed]: currentEntry.completed,
  };

  const onDoubleClickHandler = () => {
    const entryOpenerMode:EntryCardMode = currentEntry.completed
      ? EntryCardMode.READ_ONLY
      : EntryCardMode.EDIT;
    dispatch(changeOpenedEntry({
      entry: currentEntry,
      mode: entryOpenerMode,
    }));
  };
  return (
    <>
      <MiniCard
        className={classNames(cls.entry, entryMods, [])}
        onDoubleClick={onDoubleClickHandler}
      >
        <div className={cls.master}>
          <UserIcon
            userName={employee?.name}
            value={employee?.userIcon}
            className={cls.iconSize}
          />
          <span
            className={classNames(cls.name, {}, [cls.withBg])}
            data-tooltip-id={`employee-name-${id}`}
          >
            {employeeShortName}
          </span>
        </div>
        <span className={classNames(cls.time, {}, [cls.withBg])}>{time}</span>
        {!currentEntry.completed && (
          <MiniEntryController
            id={currentEntry.id}
            entry={currentEntry}
            className={cls.controller}
          />
        )}
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
            <MiniEntryInfo entryInfo={currentEntry} entryId={id} />
          </div>
          <TotalPrice entry={currentEntry} />
        </div>
      </MiniCard>
      <>
        <Tooltip id={`employee-name-${id}`} disabled={completed}>
          <span>{employee.name}</span>
        </Tooltip>
        <Tooltip id={`delete-entry-${id}`} disabled={completed}>
          {t('today-entries.controller.delete')}
        </Tooltip>
        <Tooltip id={`complete-entry-${id}`} disabled={completed}>
          {t('today-entries.controller.complete')}
        </Tooltip>
      </>
    </>
  );
});

export default MiniEntry;
