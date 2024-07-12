import { ComponentProps } from 'react';
import { LiteralUnion } from 'react-hook-form';

export interface InputProps extends ComponentProps<'input'>{
    value?: string | number;
    id?: string | undefined;
    label?: string;
    className?: string;
    error?: LiteralUnion<'pattern' |
      'value' |
      'required' |
      'minLength' |
      'maxLength' |
      'disabled' |
      'max' |
      'min' |
      'onChange' |
      'onBlur' |
      'shouldUnregister' |
      'valueAsNumber' |
      'valueAsDate' |
      'setValueAs' |
      'validate' |
      'deps', string> | undefined
  }
