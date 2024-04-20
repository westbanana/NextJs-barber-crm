import { RootState } from '@/lib/store';

export const getEmployeeList = (state:RootState) => state.employeeList.data;
