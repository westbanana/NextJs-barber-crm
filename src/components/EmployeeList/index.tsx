'use client';

import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ITooltipParams, ValueGetterParams } from 'ag-grid-community';
import { Trash2 } from 'lucide-react';

import { IEmployee } from '@/components/EmployeeList/EmployeeItem/employee.type';
import { IEmployeeProps } from '@/components/EmployeeList/employee-list.type';
import EditRowCell from '@/components/EmployeeList/EditRowCell';
import Button from '@/components/ui/Button/Button';
import { classNames } from '@/lib/classNames/classNames';

import './ag-grid.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import cls from './style.module.scss';

const EmployeeList = ({ className }: IEmployeeProps) => {
  const [employees, setEmployees] = useState<IEmployee[]>([
    {
      id: 1,
      name: 'Петро Петров',
      position: 'Барбер',
      work_schedule: 'Пн-Пт 10:00-19:00',
      services_provided: [],
    },
    {
      id: 2,
      name: 'Ілля Вінівітін',
      position: 'Прибиральник',
      work_schedule: 'Пн-Нд 10:00-12:00',
      services_provided: [],
    },
    {
      id: 3,
      name: 'Ділдо Левша',
      position: 'Барбер',
      work_schedule: 'Пн-Пт 13:00-19:00',
      services_provided: [],
    },
    {
      id: 4,
      name: 'Василь Васильев',
      position: 'Барбер',
      work_schedule: 'Пн-Пт 11:00-20:00',
      services_provided: [],
    },
    {
      id: 5,
      name: 'Олег Олегов',
      position: 'Прибиральник',
      work_schedule: 'Пн-Нд 09:00-11:00',
      services_provided: [],
    },
    {
      id: 6,
      name: 'Андрей Андреев',
      position: 'Барбер',
      work_schedule: 'Пн-Пт 12:00-18:00',
      services_provided: [],
    },
    {
      id: 7,
      name: 'Сергей Сергеев',
      position: 'Барбер',
      work_schedule: 'Пн-Пт 10:00-19:00',
      services_provided: [],
    },
    {
      id: 8,
      name: 'Алексей Алексеев',
      position: 'Прибиральник',
      work_schedule: 'Пн-Нд 10:00-12:00',
      services_provided: [],
    },
    {
      id: 9,
      name: 'Николай Николаев',
      position: 'Барбер',
      work_schedule: 'Пн-Пт 13:00-19:00',
      services_provided: [],
    },
    {
      id: 10,
      name: 'Иван Иванов',
      position: 'Барбер',
      work_schedule: 'Пн-Пт 10:00-19:00',
      services_provided: [],
    },
    {
      id: 11,
      name: 'Дмитрий Дмитриев',
      position: 'Прибиральник',
      work_schedule: 'Пн-Нд 10:00-12:00',
      services_provided: [],
    },
    {
      id: 12,
      name: 'Михаил Михайлов',
      position: 'Барбер',
      work_schedule: 'Пн-Пт 13:00-19:00',
      services_provided: [],
    },
    {
      id: 13,
      name: 'Артем Артемов',
      position: 'Барбер',
      work_schedule: 'Пн-Пт 10:00-19:00',
      services_provided: [],
    },
    {
      id: 14,
      name: 'Александр Александров',
      position: 'Барбер',
      work_schedule: 'Пн-Пт 11:00-20:00',
      services_provided: [],
    },
    {
      id: 15,
      name: 'Владимир Владимиров',
      position: 'Прибиральник',
      work_schedule: 'Пн-Нд 09:00-11:00',
      services_provided: [],
    },
    {
      id: 16,
      name: 'Евгений Евгеньев',
      position: 'Барбер',
      work_schedule: 'Пн-Пт 12:00-18:00',
      services_provided: [],
    },
    {
      id: 17,
      name: 'Сергей Сергеев',
      position: 'Барбер',
      work_schedule: 'Пн-Пт 10:00-19:00',
      services_provided: [],
    },
    {
      id: 18,
      name: 'Антон Антонов',
      position: 'Прибиральник',
      work_schedule: 'Пн-Нд 10:00-12:00',
      services_provided: [],
    },
    {
      id: 19,
      name: 'Виктор Викторов',
      position: 'Барбер',
      work_schedule: 'Пн-Пт 13:00-19:00',
      services_provided: [],
    },
    {
      id: 20,
      name: 'Геннадий Геннадьев',
      position: 'Барбер',
      work_schedule: 'Пн-Пт 10:00-19:00',
      services_provided: [],
    },
    {
      id: 21,
      name: 'Денис Денисов',
      position: 'Прибиральник',
      work_schedule: 'Пн-Нд 10:00-12:00',
      services_provided: [],
    },
    {
      id: 22,
      name: 'Игорь Игорев',
      position: 'Барбер',
      work_schedule: 'Пн-Пт 13:00-19:00',
      services_provided: [],
    },
    {
      id: 23,
      name: 'Юрий Юрьев',
      position: 'Барбер',
      work_schedule: 'Пн-Пт 10:00-19:00',
      services_provided: [],
    },
  ]);
  const [selectedRow, setSelectedRow] = useState<IEmployee[]>([]);
  const [colDefs, setColDefs] = useState<ColDef[]>([
    {
      field: 'name', headerName: "Ім'я", tooltipField: "Ім'я",
    },
    { field: 'position', headerName: 'Посада', tooltipField: 'Посада' },
    { field: 'work_schedule', headerName: 'Графік роботи', tooltipField: 'Графік роботи' },
    {
      field: '',
      sortable: false,
      flex: 0,
      valueGetter: (params: ValueGetterParams) => params.data,
      cellRenderer: EditRowCell,
    },
  ]);
  const defaultColProps = useMemo<ColDef>(() => ({
    resizable: false,
    flex: 1,
    cellClass: 'no-border',
    tooltipValueGetter: (params: ITooltipParams) => params.value,
  }), []);
  const gridRef = useRef<AgGridReact<IEmployee>>(null);

  const onSelectionChanged = useCallback(() => {
    const selectedRow = gridRef.current!.api.getSelectedRows();
    setSelectedRow(selectedRow);
  }, []);

  const deleteRow = () => {
    if (selectedRow) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== selectedRow[0]?.id));
    }
  };

  return (
    <div className={classNames(cls.EmployeesList, {}, ['ag-theme-quartz', className])}>
      <div className={cls.optionsWrapper}>
        <Button onClick={deleteRow} disabled={!selectedRow?.length} className={cls.trashBacket}>
          <Trash2 />
        </Button>
      </div>
      <AgGridReact
        ref={gridRef}
        rowData={employees}
        columnDefs={colDefs}
        rowSelection="single"
        defaultColDef={defaultColProps}
        onSelectionChanged={onSelectionChanged}
      />
    </div>
  );
};

export default EmployeeList;
