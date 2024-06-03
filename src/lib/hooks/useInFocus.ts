import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { outsideClick } from '@helpers/outSideClick';

export interface UseInFocusReturn {
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  focusedRef: React.RefObject<HTMLDivElement>;
  focused: boolean;
}
const useInFocus = (): UseInFocusReturn => {
  const [focused, setFocused] = useState<boolean>(false);
  const focusedRef = useRef<HTMLDivElement>(null);

  const disableFocus = useCallback(() => {
    if (focused) {
      setFocused(false);
    }
  }, [focused]);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    outsideClick(e, disableFocus, focusedRef);
  }, [disableFocus]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [focused, handleOutsideClick]);
  return ({
    setFocused,
    focusedRef,
    focused,
  });
};

export default useInFocus;
