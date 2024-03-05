import { RefObject } from 'react';

export const outsideClick = (
  e: MouseEvent,
  callback: () => void,
  ref: RefObject<HTMLDivElement | HTMLFormElement>,
  name?: string,
) => {
  // e.stopPropagation();
  // if (ref.current && !ref.current.contains(e.target as Node)) {
  if (ref.current && !ref.current.contains(e.target as Node)) {
    callback();
  }
};
