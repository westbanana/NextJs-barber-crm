import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { IEmployee } from '@/components/EmployeeCard/employee.type';

export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (employee:IEmployee, { rejectWithValue }) => {
    const { id, name } = employee;
    try {
      const response = await toast.promise(
        fetch(`http://localhost:4000/employees/${id}`, { method: 'DELETE' }),
        {
          pending: `Відбувається видалення ${name} 🤔`,
          success: `${name} видалений! ☠`,
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
