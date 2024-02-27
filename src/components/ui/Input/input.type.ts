import { ChangeEvent } from 'react';

export interface InputProps {
  value?: string;
  id?: string;
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
