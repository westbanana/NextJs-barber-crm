export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>{
  label: string;
  className?: string;
  alwaysOnBorder?: boolean
}
