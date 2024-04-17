export type IBarberServices = {
  id: string;
  price: number;
  name: string
}

export const barberServices:IBarberServices[] = [
  {
    price: 400,
    id: '1',
    name: 'Чоловіча стрижка',
  },
  {
    price: 700,
    id: '2',
    name: 'Жіноча стрижка',
  },
  {
    price: 200,
    id: '3',
    name: 'Підстригання бороди',
  },
  {
    price: 200,
    id: '4',
    name: 'Гоління',
  },
  {
    price: 300,
    id: '5',
    name: 'Гоління голови',
  },
  {
    price: 500,
    id: '6',
    name: 'Догляд за обличчям',
  },
];
