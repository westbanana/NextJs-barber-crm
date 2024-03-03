import React, { RefObject } from 'react';

export interface PortalProps {
  children: React.ReactNode;
  element?: RefObject<HTMLElement>| HTMLElement | undefined;
}
