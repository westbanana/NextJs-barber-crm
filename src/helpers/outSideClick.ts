import { RefObject } from 'react';

export const outsideClick = (
  e: MouseEvent,
  callback: () => void,
  ref: RefObject<HTMLDivElement | HTMLFormElement | HTMLElement | Element>,
  disableContainerSelector: string = '.base-Popper-root',
) => {
  const disabledOutsideClickContainer = document.querySelector(disableContainerSelector);
  console.log(disabledOutsideClickContainer?.contains(e.target as Element));
  if (disabledOutsideClickContainer?.contains(e.target as Element)) {
    return;
  }
  // console.log(ref.current && !ref.current.contains(e.target as Element), ref);
  if (ref.current && !ref.current.contains(e.target as Element)) {
    callback();
  }
};
