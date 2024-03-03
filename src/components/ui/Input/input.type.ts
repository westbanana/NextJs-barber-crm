import { ChangeEvent } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  value?: string | number;
  id?: string;
  label?: string;
  className?: string;
}
