import React, { ComponentPropsWithoutRef } from 'react';

export enum AlignVerticalText {
  TOP = 'textVerticalTop',
  CENTER = 'textVerticalCenter',
  BOTTOM = 'textVerticalBottom',
}

export interface ButtonProps extends ComponentPropsWithoutRef<'button'>{
  children: React.ReactNode;
  className?: string;
  alignVerticalText?: AlignVerticalText;
  loading?: boolean;
  withoutBorder?: boolean
}
