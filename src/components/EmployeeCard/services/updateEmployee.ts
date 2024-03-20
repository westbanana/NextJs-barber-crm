import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { IEmployee } from '@/components/EmployeeCard/employee.type';

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployeeAsync',
  async (employee:IEmployee, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        fetch(`http://localhost:4000/employees/${employee.id}`, {
          method: 'PUT',
          body: JSON.stringify(employee),
        }),
        {
          pending: 'Відбувається оновлення робітника 🤔',
          success: 'Інформація робітника оновлена! 🎉',
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
