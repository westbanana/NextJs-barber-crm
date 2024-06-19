import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { IEntry } from '@components/Entry/MiniEntry/entries.type';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { convertObjectToIds } from '@helpers/convertObjectToIds';
import { completeEntryToasts } from '@components/Entry/toasts';
import { toastDefaultParams } from '@constants/toast-constants';

export const completeEntry = createAsyncThunk(
  'entries/completeEntry',
  async (entry:IEntry, { rejectWithValue }) => {
    try {
      const convertedEntry = convertObjectToIds(entry);
      const { employee, id } = convertedEntry;
      const employeeCompletedEntries = await fetch(`http://localhost:4000/employees/${employee}`)
        .then((response) => response.json())
        .then((response:IEmployee) => response.completedEntries);
      await fetch(`http://localhost:4000/employees/${employee}`, {
        method: 'PATCH',
        body: JSON.stringify({ completedEntries: [...employeeCompletedEntries, id] }),
      });
      await toast.promise(
        fetch(`http://localhost:4000/entries/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ completed: true }),
        }),
        completeEntryToasts,
        toastDefaultParams,
      );
      return {
        ...entry,
        completed: true,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
