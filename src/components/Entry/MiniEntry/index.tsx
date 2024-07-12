import React, { memo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Check, Menu, User, X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import UserIcon from '@components/ui/UserIcon/UserIcon';
import TotalPrice from '@components/Entry/TotalPrice';
import { classNames, Mods } from '@lib/classNames/classNames';
import { EntryProps, IClient } from '@components/Entry/MiniEntry/entries.type';
import { EntryCardMode } from '@components/Entry/EntryCard/entry-card.type';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import MiniEntryInfo from '@components/Entry/MiniEntry/Info';
import Tooltip from '@components/ui/Tooltip/Tooltip';
import { changeOpenedEntry } from '@components/Entry/slices/entrySlice';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { IBarberServices } from '@constants/barber-services';
import { getShortName } from '@helpers/getShortName';
import { completeEntry } from '@components/Entry/services/completeEntry';
import { fetchTodayEntries } from '@components/Entry/services/fetchTodayEntries';
import { deleteEntry } from '@components/Entry/services/deleteEntry';

import cls from './style.module.scss';

import MiniCard from '../../ui/MiniCard';

const MiniEntry = memo(({
  currentEntry,
}:EntryProps) => {
  const {
    time, services, id, completed,
  } = currentEntry;

  const t = useTranslations();
  const { refresh } = useRouter();
  const dispatch = useAppDispatch();
  const employee = currentEntry.employee as IEmployee;
  const client = currentEntry.client as IClient;
  const employeeShortName = employee.name ? getShortName(employee?.name) : 'unknown';
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

  const completeCurrentEntry = async () => {
    await dispatch(completeEntry(currentEntry));
    await dispatch(fetchTodayEntries());
    refresh();
  };
  const deleteCurrentEntry = async () => {
    if (currentEntry) {
      await dispatch(deleteEntry(currentEntry));
      await dispatch(fetchTodayEntries());
    }
  };

  return (
    <>
      <MiniCard
        controllers={{
          data: [
            {
              onClick: deleteCurrentEntry,
              text: <X />,
              tooltipId: `delete-entry-${id}`,
            },
            {
              onClick: completeCurrentEntry,
              text: <Check />,
              tooltipId: `complete-entry-${id}`,
            },
          ],
          disabled: currentEntry.completed,
        }}
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
