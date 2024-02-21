import { createPortal } from 'react-dom';

import { PortalProps } from '@/components/Portal/portal.type';

const Portal = ({ element, children }:PortalProps) => createPortal(children, element);

export default Portal;
