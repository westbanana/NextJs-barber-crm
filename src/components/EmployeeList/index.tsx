'use client';

import React, { useCallback, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { PlusSquare, Trash2 } from 'lucide-react';

import { IEmployee } from '@/components/EmployeeList/EmployeeItem/employee.type';
import { IEmployeeProps } from '@/components/EmployeeList/employee-list.type';
import Button from '@/components/ui/Button/Button';
import { classNames } from '@/lib/classNames/classNames';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { getEmployeeList } from '@/components/EmployeeList/selectors/getEmployeeList';
import { ColDefs, defaultColProps } from '@/constants/colDefs';

import cls from './style.module.scss';
import './ag-grid.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { deleteEmployee } from '@/components/EmployeeList/slices/employeeListSlice';
import EmployeeCard from '@/components/EmployeeCard';
import { EmployeeCardMode } from '@/components/EmployeeCard/employee-card.type';

const EmployeeList = ({ className }: IEmployeeProps) => {
  const employees = useAppSelector(getEmployeeList);
  const dispatch = useAppDispatch();
  const [selectedRow, setSelectedRow] = useState<IEmployee[]>([]);
  const [isCreated, setIsCreated] = useState(false);
  const gridRef = useRef<AgGridReact<IEmployee>>(null);

  const onSelectionChanged = useCallback(() => {
    const selectedRow = gridRef.current!.api.getSelectedRows();
    setSelectedRow(selectedRow);
  }, []);

  const deleteRow = () => {
    if (selectedRow) {
      dispatch(deleteEmployee(selectedRow[0]?.id));
    }
  };

  const createEmployee = () => {
    setIsCreated(true);
  };

  return (
    <div className={classNames(cls.EmployeesList, {}, ['ag-theme-quartz', className])}>
      <div className={cls.optionsWrapper}>
        <Button onClick={deleteRow} disabled={!selectedRow?.length} className={cls.trashBacket}>
          <Trash2 />
        </Button>
        <Button onClick={createEmployee}>
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
      {isCreated && (
        <EmployeeCard
          mode={EmployeeCardMode.CREATE}
          isOpened={isCreated}
          onClose={() => setIsCreated(false)}
        />
      )}
    </div>
  );
};

export default EmployeeList;
