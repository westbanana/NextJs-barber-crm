import { useState } from 'react';
import { CustomCellRendererProps } from 'ag-grid-react';
import { SquarePen } from 'lucide-react';
import { useTranslations } from 'next-intl';

import EmployeeCard from '@components/Employee/EmployeeCard';
import { EmployeeCardMode } from '@components/Employee/EmployeeCard/employee-card.type';
import Tooltip from '@components/ui/Tooltip/Tooltip';

const EditRowCell = ({ valueFormatted, value }: CustomCellRendererProps) => {
  const t = useTranslations();
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
        data-tooltip-id={`edit-cell-${value.id}`}
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
          onClose={onCloseEditCard}
        />
      )}
      <Tooltip id={`edit-cell-${value.id}`}>
        {t('employee-page.edit-row')}
      </Tooltip>
    </>
  );
};

export default EditRowCell;
