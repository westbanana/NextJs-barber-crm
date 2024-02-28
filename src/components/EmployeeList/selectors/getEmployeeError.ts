import { RootState } from '@/lib/store';

export const getEmployeeError = (state:RootState) => state.employeeList.error;
