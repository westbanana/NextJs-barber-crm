import { RefObject } from 'react';

interface OutsideClickProps {
    event: MouseEvent,
    callback: () => void,
    ref: RefObject<HTMLDivElement | HTMLFormElement | HTMLElement | Element>,
    disableContainerSelector?: string,
    disableClick?: boolean,
}
export const outsideClick = ({
  disableClick = false,
  disableContainerSelector,
  ref,
  event,
  callback,
}:OutsideClickProps) => {
  event.stopPropagation();
  if (disableClick) return;
  const disabledOutsideClickContainer = disableContainerSelector
    ? document.querySelector(disableContainerSelector)
    : null;
  if (disabledOutsideClickContainer?.contains(event.target as Element)) {
    return;
  }
  if (ref.current && !ref.current.contains(event.target as Element)) {
    callback();
  }
};
