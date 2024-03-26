import { ReactNode } from 'react';
import { PlacesType } from 'react-tooltip';

export type TooltipProps = {
  children: ReactNode,
  place?: PlacesType,
  id: string,
  className?: string,
}
