import { IEmployee } from '@/components/EmployeeCard/employee.type';

export const newEmployee: IEmployee = {
  id: '',
  name: '',
  position: '',
  userIcon: '',
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
