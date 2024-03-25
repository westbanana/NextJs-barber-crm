export type FormObject = {
  target: {
    id: string;
    value: string;
  }
}

export interface UserIconProps {
  id?:string | undefined;
  userName: string | undefined;
  value?: string;
  onChange?: (e: FormObject) => void;
  withUpload?: boolean;
  className?: string;
}
