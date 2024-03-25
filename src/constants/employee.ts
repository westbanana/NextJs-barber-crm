import { IEmployee } from '@/components/EmployeeCard/employee.type';

export const newEmployee: IEmployee = {
  id: undefined,
  name: undefined,
  position: undefined,
  userIcon: undefined,
  work_schedule: {
    time: {
      from: '00:00',
      to: '00:00',
    },
    days: {
      from: '',
      to: '',
    },
  },
  services_provided: [],
};
