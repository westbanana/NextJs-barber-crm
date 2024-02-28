import { createAsyncThunk } from '@reduxjs/toolkit';

import { IEmployee } from '@/components/EmployeeList/EmployeeItem/employee.type';

export const createEmployee = createAsyncThunk(
  'employee/createEmployee',
  async (employee:IEmployee, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/employees', {
        method: 'POST',
        body: JSON.stringify({
          ...employee,
          id: `${Date.now()}`,
          work_schedule: '',
          services_provided: [],
        }),
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
