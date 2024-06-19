import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { toastDefaultParams } from '@constants/toast-constants';
import { createEmployeeToasts } from '@components/Employee/toasts';

export const createEmployee = createAsyncThunk(
  'employee/createEmployee',
  async (employee:IEmployee, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        fetch('http://localhost:4000/employees', {
          method: 'POST',
          body: JSON.stringify({
            ...employee,
            id: `${Date.now()}`,
            services_provided: [],
          }),
        }),
        createEmployeeToasts(employee),
        toastDefaultParams,
      );

      if (!response.ok) {
        throw new Error('Server error');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
