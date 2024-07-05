'use client';

import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { PlusSquare, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { IEmployeeProps } from '@/components/Employee/EmployeeList/employee-list.type';
import Button from '@/components/ui/Button/Button';
import { classNames } from '@/lib/classNames/classNames';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { getEmployeeList } from '@components/Employee/selectors/getEmployeeList';
import { ColDefs, defaultColProps } from '@/constants/colDefs';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import EmployeeCard from '@/components/Employee/EmployeeCard';
import { EmployeeCardMode } from '@/components/Employee/EmployeeCard/employee-card.type';
import { getEmployeeCardMod } from '@components/Employee/selectors/getEmployeeCardMod';
import { closeCard, openCard } from '@components/Employee/slices/employeeListSlice';
import { fetchEmployeeList } from '@components/Employee/services/fetchEmployeeList';
import { getEmployeeLoading } from '@components/Employee/selectors/getEmployeeLoading';
import { deleteEmployee } from '@components/Employee/services/deleteEmployee';
import { IEmployee } from '@/components/Employee/EmployeeCard/employee.type';
import Skeleton from '@/components/ui/Skeleton/Skeleton';

import cls from './style.module.scss';

import './ag-grid.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import Tooltip from '@components/ui/Tooltip/Tooltip';

const EmployeeList = ({ className }: IEmployeeProps) => {
  const t = useTranslations();
  const employees = useAppSelector(getEmployeeList);
  const loading = useAppSelector(getEmployeeLoading);
  const cardMod = useAppSelector(getEmployeeCardMod);
  const dispatch = useAppDispatch();
  const [selectedRow, setSelectedRow] = useState<IEmployee[]>([]);
  const gridRef = useRef<AgGridReact<IEmployee>>(null);
  useEffect(() => {
    dispatch(fetchEmployeeList());
  }, [dispatch]);

  const onSelectionChanged = useCallback(() => {
    const selectedRow = gridRef.current!.api.getSelectedRows();
    setSelectedRow(selectedRow);
  }, []);

  const deleteRow = () => {
    if (selectedRow) {
      dispatch(deleteEmployee(selectedRow[0]));
      setSelectedRow([]);
    }
  };

  const openCreateCard = () => {
    dispatch(openCard(EmployeeCardMode.CREATE));
  };

  const closeEmployeeCard = () => {
    dispatch(closeCard());
  };

  const disableDeleteButton = !selectedRow?.length;

  const columns = ColDefs.map((column) => {
    if ('headerName' in column && 'tooltipField' in column) {
      return { ...column, headerName: t(column.headerName), tooltipField: t(column.tooltipField) };
    }
    return column;
  });
  return loading
    ? (<Skeleton rounded height="771px" width="100%" />)
    : (
      <div className={classNames(cls.EmployeesList, {}, ['ag-theme-quartz', className])}>
        <div className={cls.optionsWrapper}>
          <Button
            data-tooltip-id="delete-employee-button"
            onClick={deleteRow}
            disabled={disableDeleteButton}
            className={cls.trashBacket}
            withoutBorder
          >
            <Trash2 />
          </Button>
          <Button
            data-tooltip-id="create-employee-button"
            withoutBorder
            onClick={openCreateCard}
          >
            <PlusSquare />
          </Button>
        </div>
        <AgGridReact
          ref={gridRef}
          overlayNoRowsTemplate={t('employee-page.empty-list')}
          rowData={employees}
          columnDefs={columns}
          rowSelection="single"
          defaultColDef={defaultColProps}
          onSelectionChanged={onSelectionChanged}
        />
        {cardMod && (
          <EmployeeCard
            mode={cardMod}
            onClose={closeEmployeeCard}
          />
        )}
        <Tooltip id="create-employee-button">
          {t('employee-page.list-controller.delete')}
        </Tooltip>
        <Tooltip
          id="delete-employee-button"
          disabled={disableDeleteButton}
        >
          {t('employee-page.list-controller.create')}
        </Tooltip>
      </div>
    );
};

export default EmployeeList;
