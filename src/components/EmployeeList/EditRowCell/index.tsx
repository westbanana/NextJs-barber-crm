import { CustomCellRendererProps } from 'ag-grid-react';
import { SquarePen } from 'lucide-react';

const EditRowCell = ({ valueFormatted, value }: CustomCellRendererProps) => {
  const cellValue = valueFormatted || value;
  const buttonClicked = () => {
    console.log(cellValue);
  };

  return (
    <button
      type="button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
      onClick={buttonClicked}
    >
      <SquarePen />
    </button>
  );
};

export default EditRowCell;
