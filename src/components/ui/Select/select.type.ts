export interface SelectProps {
  data: string[];
  callback?: (result:string) => void
  label:string
  className?: string
  defaultValue: string
}
