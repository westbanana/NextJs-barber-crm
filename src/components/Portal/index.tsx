import { createPortal } from 'react-dom';

import { PortalProps } from '@/components/Portal/portal.type';

const Portal = ({
  element = document.body,
  children,
}:PortalProps) => createPortal(children, element as HTMLElement);

export default Portal;
