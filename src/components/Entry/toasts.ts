import { ToastPromiseParams } from 'react-toastify';

import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';

export const fetchEntryListToasts:ToastPromiseParams<Response> = {
  pending: 'Отримання записів... 🤔',
  success: 'Записи отримано! 🎉',
  error: 'Щось пішло не так при отриманні записів 😔',
};

export const deleteEntryToasts :ToastPromiseParams<Response> = {
  pending: 'Відбувається видалення запису 🤔',
  success: 'Запис видалений! ☠',
  error: 'Щось пішло не так при видаленні запису 😔',
};

export const updateEntryToasts:ToastPromiseParams<Response> = {
  pending: 'Відбувається оновлення запису 🤔',
  success: 'Інформація про запис оновлена! 🎉',
  error: 'Щось пішло не так при оновленні запису😔',
};

export const createEntryToasts :ToastPromiseParams<Response> = {
  pending: 'Відбувається Створення запису 🤔',
  success: 'Запис створено!',
  error: 'Щось пішло не так при створенні запису 😔',
};

export const completeEntryToasts:ToastPromiseParams<Response> = {
  pending: 'Відбувається завершення запису 🤔',
  success: 'Запис завершено!',
  error: 'Щось пішло не так при завершенні запису 😔',
};
