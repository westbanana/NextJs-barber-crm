import { ToastOptions, ToastPromiseParams } from 'react-toastify';

import { IEmployee } from '@/components/Employee/EmployeeCard/employee.type';

export const toastDefaultParams:ToastOptions<Response> = {
  autoClose: 1500,
  closeOnClick: true,
  pauseOnHover: true,
};
