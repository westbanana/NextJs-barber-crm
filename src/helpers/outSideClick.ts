import { RefObject } from 'react';

export const outsideClick = (
  e: MouseEvent,
  callback: () => void,
  ref: RefObject<HTMLDivElement | HTMLFormElement | HTMLElement | Element>,
  disableContainerSelector: string = '.base-Popper-root',
) => {
  const disabledOutsideClickContainer = document.querySelector(disableContainerSelector);
  if (disabledOutsideClickContainer?.contains(e.target as Element)) {
    return;
  }
  if (ref.current && !ref.current.contains(e.target as Element)) {
    callback();
  }
};
