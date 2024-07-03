import { ComponentProps } from 'react';

export interface InputProps extends ComponentProps<'input'>{
  value?: string | number;
  id?: string | undefined;
  label?: string;
  className?: string;
}
