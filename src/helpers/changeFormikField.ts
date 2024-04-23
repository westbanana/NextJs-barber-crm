import { SelectItem } from '@components/ui/Select/select.type';
import { FieldInputProps } from 'formik';

export const changeFormikField = <T>(newValue: T, field: FieldInputProps<any>) => {
  const { name, onChange } = field;
  onChange({
    target: {
      name,
      value: newValue,
    },
  });
};
