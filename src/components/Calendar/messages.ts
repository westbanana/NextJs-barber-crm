import { Messages } from 'react-big-calendar';

export const calendarMessages: Record<string, Messages> = {
  uk: {
    week: 'Тиждень',
    work_week: 'Робочий тиждень',
    day: 'День',
    month: 'Місяць',
    previous: 'Попередній',
    next: 'Наступний',
    today: 'Сьогодні',
    agenda: 'Порядок денний',
    showMore: (total:number) => `+${total} ще`,
  },
  ru: {
    week: 'Неделя',
    work_week: 'Рабочая неделя',
    day: 'День',
    month: 'Месяц',
    previous: 'Предыдущий',
    next: 'Следующий',
    today: 'Сегодня',
    agenda: 'Повестка дня',
    showMore: (total:number) => `+${total} еще`,
  },
};
