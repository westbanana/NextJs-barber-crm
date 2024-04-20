import { ToastOptions, ToastPromiseParams } from 'react-toastify';

import { IEmployee } from '@/components/Employee/EmployeeCard/employee.type';

export const toastDefaultParams:ToastOptions<Response> = {
  autoClose: 1500,
  closeOnClick: true,
  pauseOnHover: true,
};

export const fetchEmployeeListToasts:ToastPromiseParams<Response> = {
  pending: 'Отримання робітників... 🤔',
  success: 'Робітники отримані! 🎉',
  error: 'Щось пішло не так... 😔',
};

export const deleteEmployeeToasts = (name: string):ToastPromiseParams<Response> => ({
  pending: `Відбувається видалення ${name} 🤔`,
  success: `${name} видалений! ☠`,
  error: 'Щось пішло не так 😔',
});

export const updateEmployeeToasts:ToastPromiseParams<Response> = {
  pending: 'Відбувається оновлення робітника 🤔',
  success: 'Інформація робітника оновлена! 🎉',
  error: 'Щось пішло не так 😔',
};

export const createEmployeeToasts = (employee:IEmployee):ToastPromiseParams<Response> => ({
  pending: `Відбувається Створення ${employee.name} 🤔`,
  success: `Робітник ${employee.name} створений! 🎉`,
  error: 'Щось пішло не так 😔',
});
