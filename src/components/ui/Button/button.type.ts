import React from 'react';

export enum AlignVerticalText {
  TOP = 'textVerticalTop',
  CENTER = 'textVerticalCenter',
  BOTTOM = 'textVerticalBottom',
}

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  alignVerticalText?: AlignVerticalText;
  loading?: boolean;
}
