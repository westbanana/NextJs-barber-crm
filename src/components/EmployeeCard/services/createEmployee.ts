import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { IEmployee } from '@/components/EmployeeCard/employee.type';

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
            work_schedule: '',
            services_provided: [],
          }),
        }),
        {
          pending: `Відбувається Створення ${employee.name} 🤔`,
          success: `Робітник ${employee.name} створений! 🎉`,
          error: 'Щось пішло не так 😔',
        },
        {
          closeOnClick: true,
          autoClose: 1500,
          pauseOnHover: true,
        },
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
