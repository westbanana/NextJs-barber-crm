import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { IEmployee } from '@/components/EmployeeCard/employee.type';
import { createEmployeeToasts, toastDefaultParams } from '@/constants/toast-constants';

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
