import { ColDef, ValueGetterParams, ITooltipParams } from 'ag-grid-community';

import EditRowCell from '@/components/EmployeeList/EditRowCell';

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
  { field: 'work_schedule', headerName: 'Графік роботи', tooltipField: 'Графік роботи' },
  {
    field: '',
    sortable: false,
    flex: 0,
    valueGetter: (params: ValueGetterParams) => params.data,
    cellRenderer: EditRowCell,
  },
];
