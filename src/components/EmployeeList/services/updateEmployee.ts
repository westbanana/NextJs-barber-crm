import { createAsyncThunk } from '@reduxjs/toolkit';

import { IEmployee } from '@/components/EmployeeList/EmployeeItem/employee.type';

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployeeAsync',
  async (employee:IEmployee, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/employees/${employee.id}`, {
        method: 'PUT',
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
