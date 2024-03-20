import { RootState } from '@/lib/store';

export const getEmployeeCardMod = (state:RootState) => state.employeeList.openedCard;
