import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { IEmployee } from '@/components/Employee/EmployeeCard/employee.type';
import { deleteEmployeeToasts, toastDefaultParams } from '@/constants/toast-constants';

export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (employee:IEmployee, { rejectWithValue }) => {
    const { id, name } = employee;
    try {
      const response = await toast.promise(
        fetch(`http://localhost:4000/employees/${id}`, { method: 'DELETE' }),
        deleteEmployeeToasts(name!!),
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
