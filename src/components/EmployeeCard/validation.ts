import {
  object, string, number, date, InferType,
} from 'yup';

export const EmployeeSchema = object().shape({
  name: string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  position: string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});
