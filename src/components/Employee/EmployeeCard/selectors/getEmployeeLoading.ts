import { RootState } from '@/lib/store';

export const getEmployeeLoading = (state:RootState) => state.employeeList.loading;
