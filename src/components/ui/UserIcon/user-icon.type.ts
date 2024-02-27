export type FormObject = {
  target: {
    id: string;
    value: string;
  }
}

export interface UserIconProps {
  id?:string;
  userName: string;
  value?: string;
  onChange?: (e: FormObject) => void;
  withUpload?: boolean;
}
