import { ColDef, ValueGetterParams, ITooltipParams } from 'ag-grid-community';
import i18next from 'i18next';

import EditRowCell from '@/components/Employee/EmployeeList/EditRowCell';

export const defaultColProps: ColDef = {
  resizable: false,
  flex: 1,
  lockPosition: true,
  cellClass: 'no-border',
  tooltipValueGetter: (params: ITooltipParams) => params.value,
};

export const ColDefs = [
  {
    field: 'name',
    headerName: 'employee-page.columns.name.title',
    tooltipField: 'employee-page.columns.name.tooltip',
  },
  {
    field: 'position',
    headerName: 'employee-page.columns.position.title',
    tooltipField: 'employee-page.columns.position.tooltip',
  },
  {
    field: 'work_schedule',
    headerName: 'employee-page.columns.schedule.title',
    tooltipField: 'employee-page.columns.schedule.tooltip',
    valueGetter: (params: ValueGetterParams) => {
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
