import { ToastPromiseParams } from 'react-toastify';

export const fetchClientListToasts:ToastPromiseParams<Response> = {
  pending: 'Отримання клієнтів... 🤔',
  success: 'Клієнтів отримано! 🎉',
  error: 'Щось пішло не так при отриманні клієнтів 😔',
};

export const deleteClientToasts = (name: string):ToastPromiseParams<Response> => ({
  pending: `Відбувається видалення клієнта ${name}🤔`,
  success: `Клієнт ${name} видалений! ☠`,
  error: 'Щось пішло не так при видаленні клієнта 😔',
});

export const updateClientToasts:ToastPromiseParams<Response> = {
  pending: 'Відбувається оновлення клієнта 🤔',
  success: 'Інформація про клієнта оновлена! 🎉',
  error: 'Щось пішло не так при оновленні клієнта😔',
};

export const createClientToasts = ():ToastPromiseParams<Response> => ({
  pending: 'Відбувається Створення клієнта 🤔',
  success: 'Клієнта створено!',
  error: 'Щось пішло не так при створенні клієнта 😔',
});
