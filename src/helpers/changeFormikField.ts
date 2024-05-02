import { FieldInputProps, FieldProps } from 'formik';

export const changeFormikField = <T>(newValue: T | T[], field: FieldInputProps<any>) => {
  const { name, onChange } = field;
  onChange({
    target: {
      name,
      value: newValue,
    },
  });
};

export const changeFormikFields = (props: FieldProps, objValues:any) => {
  props.form.setValues({
    ...props.form.values,
    ...objValues,
  });
};
