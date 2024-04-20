import { createAsyncThunk } from '@reduxjs/toolkit';
import { IEntries } from '@components/Entry/MiniEntry/entries.type';
import { getAllClients } from '@components/Entry/services/getClients';
import { getAllEmployees, getEmployees } from '@components/Entry/services/getEmployees';

export const fetchEntriesDates = createAsyncThunk(
  'entries/fetchEntriesDates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/entries');
      if (!response.ok) {
        throw new Error('Server error');
      }
      return response.json()
        .then((response: IEntries[]) => response.map(({
          date,
          time,
        }) => `${date} ${time}`));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchClientsAndEmployees = createAsyncThunk(
  'entries/fetchClientsAndEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const clients = await getAllClients();
      const employees = await getAllEmployees();
      return { clients, employees };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
