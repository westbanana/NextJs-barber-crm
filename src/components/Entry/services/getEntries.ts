import { IEntries } from '@components/Entry/MiniEntry/entries.type';

export const getEntries = () => fetch('http://localhost:4000/entries')
  .then((response) => response.json());
