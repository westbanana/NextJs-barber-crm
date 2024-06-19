import { ToastPromiseParams } from 'react-toastify';

export const fetchTodosToasts:ToastPromiseParams<Response> = {
  pending: 'Отримання пам\'яток... 🤔',
  success: 'Пам\'ятки отримані! 🎉',
  error: 'Щось пішло не так... 😔',
};

export const deleteTodosToasts :ToastPromiseParams<Response> = {
  pending: 'Відбувається видалення пам\'ятки 🤔',
  success: 'Пам\'ятка видалена! ☠',
  error: 'Щось пішло не так 😔',
};

export const updateTodosToasts:ToastPromiseParams<Response> = {
  pending: 'Відбувається оновлення пам\'ятки 🤔',
  success: 'Пам\'ятка оновлена! 🎉',
  error: 'Щось пішло не так 😔',
};

export const createTodosToasts:ToastPromiseParams<Response> = {
  pending: 'Відбувається пам\'ятки 🤔',
  success: 'Пам\'ятка  створена! 🎉',
  error: 'Щось пішло не так 😔',
};
