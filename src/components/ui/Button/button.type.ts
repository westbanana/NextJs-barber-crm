import React from 'react';

export enum AlignVerticalText {
  TOP = 'textVerticalTop',
  CENTER = 'textVerticalCenter',
  BOTTOM = 'textVerticalBottom',
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  alignVerticalText?: AlignVerticalText;
  loading?: boolean;
  withoutBorder?: boolean
}
