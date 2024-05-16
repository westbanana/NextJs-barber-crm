import { createAsyncThunk } from '@reduxjs/toolkit';
import { IEntry } from '@components/Entry/MiniEntry/entries.type';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';

export const completeEntry = createAsyncThunk(
  'entries/completeEntry',
  async (entry:IEntry, { rejectWithValue }) => {
    try {
      const { employee, id } = entry;
      const employeeCompletedEntries = await fetch(`http://localhost:4000/employees/${employee}`)
        .then((response) => response.json())
        .then((response:IEmployee) => response.completedEntries);
      await fetch(`http://localhost:4000/employees/${employee}`, {
        method: 'PATCH',
        body: JSON.stringify({ completedEntries: [...employeeCompletedEntries, entry.id] }),
      });
      await fetch(`http://localhost:4000/entries/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ completed: true }),
      });
      return {
        ...entry,
        completed: true,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
