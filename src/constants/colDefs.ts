import { ColDef, ValueGetterParams, ITooltipParams } from 'ag-grid-community';

import EditRowCell from '@/components/Employee/EmployeeList/EditRowCell';

export const defaultColProps: ColDef = {
  resizable: false,
  flex: 1,
  cellClass: 'no-border',
  tooltipValueGetter: (params: ITooltipParams) => params.value,
};

export const ColDefs:ColDef[] = [
  {
    field: 'name', headerName: "Ім'я", tooltipField: "Ім'я",
  },
  { field: 'position', headerName: 'Посада', tooltipField: 'Посада' },
  {
    field: 'work_schedule',
    headerName: 'Графік роботи',
    tooltipField: 'Графік роботи',
    valueGetter: (params) => {
      const { time, days } = params.data.work_schedule;
      const timeResult = `${time.from}/${time.to}`;
      const daysResult = days ? `${days?.from}-${days?.to}` : 'ПН-ПТ';
      return `${daysResult} | ${timeResult}`;
    },
  },
  {
    field: '',
    sortable: false,
    minWidth: 100,
    maxWidth: 100,
    flex: 1,
    valueGetter: (params: ValueGetterParams) => params.data,
    cellRenderer: EditRowCell,
  },
];
