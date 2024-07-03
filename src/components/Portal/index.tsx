import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { PortalProps } from '@/components/Portal/portal.type';

const Portal = ({
  element,
  children,
}: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? createPortal(children, element || document.body) : null;
};

export default Portal;
