import { Style } from 'node:util';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>{
  label: string;
  className?: string;
  alwaysOnBorder?: boolean
  style?: any
}
