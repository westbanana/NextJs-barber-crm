'use client';

import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { PlusSquare, Trash2 } from 'lucide-react';

import { IEmployeeProps } from '@/components/EmployeeList/employee-list.type';
import Button from '@/components/ui/Button/Button';
import { classNames } from '@/lib/classNames/classNames';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { getEmployeeList } from '@/components/EmployeeList/selectors/getEmployeeList';
import { ColDefs, defaultColProps } from '@/constants/colDefs';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import EmployeeCard from '@/components/EmployeeCard';
import { EmployeeCardMode } from '@/components/EmployeeCard/employee-card.type';
import { getEmployeeCardMod } from '@/components/EmployeeCard/selectors/getEmployeeCardMod';
import { openCard } from '@/components/EmployeeList/slices/employeeListSlice';
import { fetchEmployeeList } from '@/components/EmployeeList/services/fetchEmployeeList';
import { getEmployeeLoading } from '@/components/EmployeeCard/selectors/getEmployeeLoading';
import { deleteEmployee } from '@/components/EmployeeCard/services/deleteEmployee';
import LoadingProvider from '@/components/LoadingProvider/LoadingProvider';
import { IEmployee } from '@/components/EmployeeCard/employee.type';

import cls from './style.module.scss';
import './ag-grid.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const EmployeeList = ({ className }: IEmployeeProps) => {
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
    }
  };

  const openCreateCard = () => {
    dispatch(openCard(EmployeeCardMode.CREATE));
  };

  const closeCard = () => {
    dispatch(openCard(undefined));
  };

  return (
    <LoadingProvider isLoading={loading} toastMode>
      <div className={classNames(cls.EmployeesList, {}, ['ag-theme-quartz', className])}>
        <div className={cls.optionsWrapper}>
          <Button
            onClick={deleteRow}
            disabled={!selectedRow?.length}
            className={cls.trashBacket}
            withoutBorder
          >
            <Trash2 />
          </Button>
          <Button
            withoutBorder
            onClick={openCreateCard}
          >
            <PlusSquare />
          </Button>
        </div>
        <AgGridReact
          ref={gridRef}
          rowData={employees}
          columnDefs={ColDefs}
          rowSelection="single"
          defaultColDef={defaultColProps}
          onSelectionChanged={onSelectionChanged}
        />
        {cardMod && (
          <EmployeeCard
            mode={cardMod}
            onClose={closeCard}
          />
        )}
      </div>
    </LoadingProvider>
  );
};

export default EmployeeList;
