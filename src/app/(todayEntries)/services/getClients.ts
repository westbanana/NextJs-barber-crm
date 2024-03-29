import { IClient } from '@/components/Entry/entries.type';

export const getClients = (arr:string[]) => fetch('http://localhost:4000/clients')
  .then((response) => response.json())
  .then((response) => response.filter((client: IClient) => arr.includes(client?.id)));
