import { getAllClients } from '@components/Entry/services/getClients';
import { getAllEmployees } from '@components/Entry/services/getEmployees';
import { barberServices } from '@constants/barber-services';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { IClient } from '@components/Entry/MiniEntry/entries.type';

export const getSelectsData = async () => {
  try {
    const clients:IClient[] = await getAllClients();
    const employees: IEmployee[] = await getAllEmployees();
    const services = barberServices;
    return ({
      clients,
      employees,
      services,
    });
  } catch (e) {
    throw new Error('Server error');
  }
};
