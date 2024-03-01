import { useState } from 'react';
import { CustomCellRendererProps } from 'ag-grid-react';
import { SquarePen } from 'lucide-react';

import EmployeeCard from '@/components/EmployeeCard/index';
import { EmployeeCardMode } from '@/components/EmployeeCard/employee-card.type';

const EditRowCell = ({ valueFormatted, value }: CustomCellRendererProps) => {
  const [isEditCard, setIsEditCard] = useState(false);
  const cellValue = valueFormatted || value;
  const onClickHandle = () => {
    setIsEditCard(true);
  };

  const onCloseEditCard = () => {
    setIsEditCard(false);
  };

  return (
    <>
      <button
        type="button"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
        onClick={onClickHandle}
      >
        <SquarePen />
      </button>
      {isEditCard && (
        <EmployeeCard
          mode={EmployeeCardMode.EDIT}
          employeeData={cellValue}
          // isOpened={isEditCard}
          onClose={onCloseEditCard}
        />
      )}
    </>
  );
};

export default EditRowCell;
