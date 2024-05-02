import React from 'react';
import { useAppDispatch } from '@lib/hooks/useAppDispatch';
import { IEmployee } from '@components/Employee/EmployeeCard/employee.type';
import { deleteEmployee } from '@components/Employee/EmployeeCard/services/deleteEmployee';

const EmployeeRemover = ({ children, entry }: {children: React.ReactNode, entry: IEmployee | undefined}) => {
  const dispatch = useAppDispatch();
  const deleteCurrentEmployee = () => {
    if (entry) {
      dispatch(deleteEmployee(entry));
    }
  };
  return (
    <div onClick={deleteCurrentEmployee}>
      {children}
    </div>
  );
};

export default EmployeeRemover;
