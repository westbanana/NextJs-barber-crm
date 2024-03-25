export type IBarberServices = {
  id: string;
  price: number;
  serviceName: string
}

export const barberServices:IBarberServices[] = [
  {
    price: 400,
    id: '1',
    serviceName: 'Чоловіча стрижка',
  },
  {
    price: 700,
    id: '2',
    serviceName: 'Жіноча стрижка',
  },
  {
    price: 200,
    id: '3',
    serviceName: 'Підстригання бороди',
  },
  {
    price: 200,
    id: '4',
    serviceName: 'Гоління',
  },
  {
    price: 300,
    id: '5',
    serviceName: 'Гоління голови',
  },
  {
    price: 500,
    id: '6',
    serviceName: 'Догляд за обличчям',
  },
];
