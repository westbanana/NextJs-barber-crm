import { Components } from 'react-big-calendar';

import EventAgenda from '@components/Calendar/components/EventAgenda';
import EventMonth from '@components/Calendar/components/EventMonth';

export const components: Components = {
  agenda: {
    event: EventAgenda,
  },
  month: {
    event: EventMonth,
  },
};
