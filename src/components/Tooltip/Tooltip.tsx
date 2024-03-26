import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { TooltipProps } from '@/components/Tooltip/tooltip.type';

import './style.css';

const Tooltip = ({ children, place = 'bottom', id }:TooltipProps) => (
  <ReactTooltip id={id} className="reactTooltip" place={place} opacity={1}>
    {children}
  </ReactTooltip>
);

export default Tooltip;
