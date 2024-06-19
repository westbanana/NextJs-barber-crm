import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { toastDefaultParams } from '@constants/toast-constants';
import { updateEmployeeToasts } from '@components/Employee/toasts';

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployeeAsync',
  async (employee:IEmployee, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        fetch(`http://localhost:4000/employees/${employee.id}`, {
          method: 'PUT',
          body: JSON.stringify(employee),
        }),
        updateEmployeeToasts,
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
